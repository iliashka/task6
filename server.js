const express = require('express');
const useSocket = require('socket.io')
const cors = require('cors')

const PORT = 9999

const app = express();
const http = require('http')
const server = http.Server(app);
const io = useSocket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        optionsSuccessStatus: 200
    }
});

const rooms = new Map();

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
  }))

app.use(express.json())

app.get('/rooms/:id', (req, res) => {
    const { id: roomName } = req.params
    const obj = rooms.has(roomName) ? 
    {
        users: [...rooms.get(roomName).get('users').values()],
        ticTacks: [...rooms.get(roomName).get('ticTacs').values()]
    } : 
    {users: [], ticTacs: Array(9).fill(null)} ;
    res.json(obj);
});

app.post('/rooms', (req, res) => {
    const { roomName, userName } = req.body;
    if (!rooms.has(roomName)){
        rooms.set(roomName, new Map([
            ['users', new Map()],
            ['ticTacs', Array(9).fill(null)]
        ]));
    } res.send();
})

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({roomName, userName}) => {
        socket.join(roomName);
        rooms.get(roomName).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomName).get('users').values()];
        socket.to(roomName).emit('ROOM:SET_USERS', users);
    });

    socket.on('ROOM:NEW_TICTAC', ({roomName, userName, tictac, ticId }) => {
        const obj = {
            userName,
            ticId, 
            tictac
        }
        rooms.get(roomName).get('ticTacs').splice(obj.ticId, 1, obj.tictac);
        const ticTacField = [...rooms.get(roomName).get('ticTacs').values()]
        socket.to(roomName).broadcast.emit('ROOM:NEW_TICTAC', ticTacField)
        console.log(ticTacField)
    });



    socket.on('disconnect', () => {
        rooms.forEach((value, roomName) => {
            if(value.get('users').delete(socket.id)){
              const users = [...rooms.get(roomName).get('users').values()];
              socket.to(roomName).broadcast.emit('ROOM:SET_USERS', users);  
            }
        })
    })

    console.log('user connected', socket.id);
})

server.listen(PORT, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Сервер запущен!');
});