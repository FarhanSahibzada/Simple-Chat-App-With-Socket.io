import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("what is socket", socket)
    console.log("socket is active and connected")

    socket.on('chat-app' , (payload)=>{
        console.log("what is payload " , payload)
        io.emit('chat-app' , payload)
    })
});

httpServer.listen(3000, ()=>{
    console.log("backend is running on port 3000")
});