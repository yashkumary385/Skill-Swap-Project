import React, { useEffect, useState } from 'react'
import socket , {recieveMessage, sendMessage} from "../../Socket.js"
import { useAuth } from '../../context/useAuth.js';
import { useParams } from 'react-router-dom';
import axios from "axios"



const Chat = () => {
    const {user} = useAuth();
    const {chatId} = useParams();
    const [messages , setMessages] = useState([])
    const [input , setInput] = useState("")
    
    useEffect(()=>{
      const getMessage = async()=>{
        try {
           const res = await axios.get(`http://localhost:8000/message/chat/${chatId}`)
      console.log(res);
      setMessages(res.data.chat.messages);
        } catch (error) {
          console.log(error)
        }
      }
      getMessage()
    },[chatId])

    useEffect(()=>{
      const handleMessage = (msg)=>{
        if(chatId === msg.chatId )
        setMessages((prev)=>([...prev , msg]))
      }
recieveMessage(handleMessage)
      return () => socket.off("receive-message", handleMessage);
    },[chatId])

    const handleSend = ()=>{
      if(!input.trim()) return ;
      // console.log(chatId,user._id,input)
      sendMessage(chatId,user._id,
        input
      )
       setMessages((prev) => [...prev, { sender: user._id, content: input }]);
      setInput("");
    }
    return (
        <div>
            <h2>Chat Room</h2>
            <div style={{ height: 300, overflowY: "scroll", border: "1px solid #ccc" }}>
                {messages.map((m, idx) => (
                    <div key={idx} style={{ textAlign: m.sender === user._id ? "right" : "left" }}>
                        <b>{m.sender === user._id ? "Me" : "Them"}:</b> {m.content}
                    </div>
                ))}
            </div>
            <input value={input} className='bg-red-600' onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default Chat
