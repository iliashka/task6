const express = require('express');
const useSocket = require('socket.io')

const app = express();
app.use(require('cors'))
const server = require('http').createServer(app);
const io = useSocket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms);
});

io.on('connection', (socket) => {
    console.log('user connected', socket.id);
})

server.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Сервер запущен!');
});