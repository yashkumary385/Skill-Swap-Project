import React, { useEffect, useState } from 'react'
import socket , {recieveMessage, sendMessage} from "../../Socket.js"
import { useAuth } from '../../context/useAuth.js';
import { useParams } from 'react-router-dom';
import axios from "axios"



const Chat = () => {
    const {user, token} = useAuth();
    const {chatId} = useParams();
    const [messages , setMessages] = useState([])
    const [input , setInput] = useState("")
    
    useEffect(()=>{
      const getMessage = async()=>{
        try {
           const res = await axios.get(`http://localhost:8000/message/chat/${chatId}`,
            {
              headers:{ Authorization : `Bearer ${token} `}
            }
           )
      console.log(res);
      setMessages(res.data);
        } catch (error) {
          console.log(error)
        }
      }
      getMessage()
    },[])

    useEffect(()=>{
         socket.on("recieve-message",(msg)=>{
         console.log(msg);
        if(chatId === msg.chatId ){
        setMessages((prev)=>([...prev , msg]))
        }
         }
          
          )
      return () => socket.off("receive-message");
    },[])
     

    const handleSend = ()=>{
      if(!input.trim()) return ;
      // console.log(chatId,user._id,input)
          socket.emit("send-message", {
            chatId :chatId,
            sender:user._id,
            content:input

          })
       setMessages((prev) => [...prev, { sender: user._id, content: input }]);
      setInput("");
      console.log(messages)
      
    }
      // console.log(messages)


    return (
        <div>
            <h2>Chat Room</h2>
            <div style={{ height: 300, overflowY: "scroll", border: "1px solid #ccc" }}>
                {messages.map((m, idx) => (
                    <div key={idx} style={{ textAlign: m.sender === user?._id ? "right" : "left" }}>
                        <b>{m.sender === user?._id ? "Me" : "Them"}:</b> {m.content}
                    </div>
                ))}
            </div>
            <input value={input} className='bg-red-600' onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default Chat
