import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"
//import { nanoid } from "nanoid"

const socket = io('http://localhost:3000')

function App() {

  const [msg , setMsg ]= useState('')
  
  const handlesubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(msg.length <= 0 ){
      console.log("field is empty")
      return
    }
    socket.emit('chat-app' , {msg})
    setMsg('')
  }

  useEffect(()=>{
    socket.on('chat-app' , (payload  : string)=>{
      console.log("checking payload" , payload)
    })
  })

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handlesubmit}>
      <div className="flex flex-col mb-2">
      <label htmlFor="msg">Write Message</label>
      <input type="text"  id="msg"
      placeholder="Send Msg" 
      value={msg}
      onChange={(e)=> setMsg(e.target.value)}
      className="w-52 py-2 px-2 border-slate-200 border-4 mt-3 rounded-xl"/>
      <button
      type="submit"
      className="py-2 px-3.5 rounded-xl bg-slate-200 mt-6 cursor-pointer hover:bg-slate-500"> Send</button>
      </div>
      </form>
    </div>
  )
}

export default App
