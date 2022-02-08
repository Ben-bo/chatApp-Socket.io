const express = require('express');
const app = express();
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
        console.log(name, room);

        const error = true

    })

    socket.on("disconnect", () => {
        console.log('user has left');
    });
});

httpServer.listen(port, () => {
    console.log(`server run on port ${port}`);
});