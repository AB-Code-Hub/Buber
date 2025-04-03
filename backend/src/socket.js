import { Server } from 'socket.io';
import { User as userModel } from './models/user.model.js';
import { Captain as captainModel } from './models/captin.model.js';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            // origin: "http://localhost:5173" || "*",
            origin: "https://1pvs5j71-5173.inc1.devtunnels.ms",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    io.on('connection', (socket) => { 
        console.log('User connected:', socket.id);

        socket.on('join', async (data) => {
            const {userId, userType} = data;

            console.log(`User ${userId} joined ${userType} room`);
            
            try {
                let user;
                if(userType === 'user'){
                    user = await userModel.findByIdAndUpdate(userId, {socketId: socket.id}, {new: true});
                }else if(userType === 'captain'){
                    user = await captainModel.findByIdAndUpdate(userId, {socketId: socket.id}, {new : true});
                }

                if(!user){
                    throw new Error('User not found');
                }

                
            } catch (error) {
                console.error('Error joining room:', error);
            }
        }); 

        

        socket.on('update-location-captain', async (data) => {
            const {userId,  location} = data;

            
            // Validate location data
            if (!location || typeof location !== 'object') {
                console.error('Invalid location data:', location);
                socket.emit('error', { message: 'Invalid location data format' });
                return;
            }

            // Check if location has required coordinates
            if (location.ltd === undefined || location.lng === undefined) {
                console.error('Missing coordinates in location data:', location);
                socket.emit('error', { message: 'Location must include ltd and lng coordinates' });
                return;
            }

            // Validate coordinate types
            if (typeof location.ltd !== 'number' || typeof location.lng !== 'number') {
                console.error('Coordinates must be numbers:', location);
                socket.emit('error', { message: 'Coordinates must be numbers' });
                return;
            }

            // Validate coordinate ranges
            if (location.ltd < -90 || location.ltd > 90 || location.lng < -180 || location.lng > 180) {
                console.error('Coordinates out of valid range:', location);
                socket.emit('error', { message: 'Coordinates out of valid range' });
                return;
            }

           

            // Update captain location
                await captainModel.findByIdAndUpdate(userId, {location: {
                    ltd: location.ltd,
                    lng: location.lng,
                }}, {new: true});

          
            
            
        })
                

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

export const sendMessageToSocketId = (socketId, messageobj) => {
    if (!io) {
        console.error('Socket not initialized');
        return;
    }

    try {
        console.log(`Sending message to socket ${socketId}:`, messageobj);
        io.to(socketId).emit(messageobj.event, messageobj.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}; 