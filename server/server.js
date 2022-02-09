const express = require('express');
const app = express();
const { getUserInRoom, getUser, removeUser, addUser } = require('./users')
const { createServer } = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 5000
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
}
});
const route = require('./routes/route')
app.use(route)
io.on("connection", (socket) => {
    console.log('new connection');

    //join harus sama dengan join scoket emit frontend
    socket.on('join', ({ name, room }, callback) => {


        const { error, user } = addUser({ id: socket.id, name, room })
        if (error) {
            return callback(error)
        }
        socket.emit('message', { user: "admin", text: `${user.name}, Welcome to the room : ${user.room}` })
        socket.join(user.room)
    })

    socket.on("disconnect", () => {
        console.log('user has left');
    });
});

httpServer.listen(port, () => {
    console.log(`server run on port ${port}`);
});