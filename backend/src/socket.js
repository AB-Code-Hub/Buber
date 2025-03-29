import { Server } from 'socket.io';
import { User as userModel } from './models/user.model.js';
import { Captain as captainModel } from './models/captin.model.js';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin:  "http://localhost:5173" || "*",
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

                // socket.join(user.role);
                // console.log(`User ${user.fullName.firstName} joined ${user.role} room`);
            } catch (error) {
                console.error('Error joining room:', error);
            }
        });
                

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

export const sendMessageToSocketId = (socketId, message) => {
    if (!io) {
        console.error('Socket not initialized');
        return;
    }

    try {
        io.to(socketId).emit("message", message);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}; 