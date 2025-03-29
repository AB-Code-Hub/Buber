import React, { createContext, useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const eventHandlersRef = useRef({});

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io(import.meta.env.VITE_BASE_URL || 'http://localhost:4000', {
            withCredentials: true,
            autoConnect: true
        });

        // Connection event handlers
        socketRef.current.on('connect', () => {
            console.log('Connected to socket server');
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        socketRef.current.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    // Function to send message to server
    const sendMessage = (eventName, data) => {
        if (!socketRef.current?.connected) {
            console.error('Socket not connected');
            return;
        }
        socketRef.current.emit(eventName, data);
        console.log(`Sending message to server: ${eventName} with data: ${JSON.stringify(data)}`);
    };

    // Function to listen to specific events
    const onMessage = (eventName, callback) => {
        if (!socketRef.current) return;

        // Remove existing listener if any
        if (eventHandlersRef.current[eventName]) {
            socketRef.current.off(eventName, eventHandlersRef.current[eventName]);
        }

        // Add new listener
        socketRef.current.on(eventName, callback);
        eventHandlersRef.current[eventName] = callback;

        // Return cleanup function
        return () => {
            if (socketRef.current) {
                socketRef.current.off(eventName, callback);
                delete eventHandlersRef.current[eventName];
            }
        };
    };

    const value = {
        socket: socketRef.current,
        sendMessage,
        onMessage,
        isConnected: socketRef.current?.connected || false
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider; 