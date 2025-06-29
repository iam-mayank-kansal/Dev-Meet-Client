const bodyParser = require("body-parser");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const io = new Server(app);

app.use(bodyParser.json);

// api's 
const emailToSocketMapping = new Map();
io.on("connection", (socket) => {
    socket.on("join-room", (data) => {
        const { roomId, userName, userEmail , userPassword } = data;
        emailToSocketMapping.set(userEmail,socket.id);
        socket.join(roomId);
        console.log(`${userName} with ${userEmail} joined room : ${roomId} `)
        socket.broadcast.to(roomId).emit(`${userName} with ${userEmail} joined! `)
    })
})

app.listen(process.env.BACKEND_PORT);
io.listen(process.env.IO_PORT);

