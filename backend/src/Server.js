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
    console.log("socket is active and connected")
    //we can you use socket to get payload forn client
    socket.on('chat-app' , (payload)=>{
        console.log("what is payload " , payload)
        // we can you io.emit to send data to ohter client connections
        io.emit('chat-app' , payload)
    })
});

httpServer.listen(3000, ()=>{
    console.log("backend is running on port 3000")
});