const { Server } = require("socket.io");

let io;
const setupChat = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
    
        socket.on("join_room", (data) => {
            const { room } = data;
            console.log(`Client ${socket.id} joining room: ${room}`);
            socket.join(room);
        });
    
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
    
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};

module.exports = { setupChat, getIO };
