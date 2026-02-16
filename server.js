const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join-room', ({ roomId, username }) => {
        socket.join(roomId);
        socket.username = username;
        socket.roomId = roomId;

        console.log(`${username} joined room: ${roomId}`);
        
        socket.to(roomId).emit('user-joined', { id: socket.id, username });
    });

    socket.on('send-location', (data) => {
        io.to(data.roomId).emit('receive-location', {
            id: socket.id,
            username: socket.username,
            latitude: data.latitude,
            longitude: data.longitude
        });
    });

    socket.on('disconnect', () => {
        io.to(socket.roomId).emit('user-left', socket.id);
        console.log('User left:', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));