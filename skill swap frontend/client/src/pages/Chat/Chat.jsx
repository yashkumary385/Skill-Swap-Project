import  { useEffect, useState,useRef } from 'react'
import socket from "../../Socket.js"
import { useAuth } from '../../context/useAuth.js';
import { useParams } from 'react-router-dom';
import axios from "axios"
import Header from '../../components/Navbar/Navbar.jsx';
import { getChat } from '../../api/api.js';

   
const Chat = () => {
  const { user, token } = useAuth();
  const { chatId } = useParams();
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [person , setPerson] = useState("")
  const typingTimeoutRef = useRef(null)
  const [typing, setTyping] = useState(false)
  /// HAVE TO FIX CHAT LIVE RENDERING ISSUE

  // useEffect(()=>{
    

  // },[])
// mark as read

// useEffect(() => {
//   if (messages?.length > 0 && user?._id) {
//     messages.forEach((msg) => {
//       if (!msg?.readBy?.includes(user._id)) {
//         markAsRead(user._id, msg._id, chatId);
//       }
//     });
//   }
// }, [chatId, messages, user]);


  const getMessage = async () => {
      try {
        const res = await getChat(chatId)
          
        setMessages(res.data);

        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  useEffect(() => {
    getMessage()
   
    //
  }, [])

  useEffect(() => {
    socket.on("receive-message", ({chatId,sender,content}) => {
      // console.log(msg);
      // setPerson(sender)
      if (chatId === chatId) {
        setMessages((prev) => ([...prev,{chatId,sender,content}]))
      }
    },[])


    socket.on("typing", ({userId,sender,name})=>{
      if(sender !== userId){
        // console.log(name)
      console.log(userId)
      
       setPerson(name.name)
        console.log("yesss")
      setTyping(true)
      }
    })
    socket.on("Not-typing", ({userId,sender})=>{
      console.log(userId)
        if(sender !== userId){
        console.log("nooo")
      setTyping(false)
      }
    })


    socket.on("message-read", ({messageId,reader})=>{
      setMessages((prev)=>{
        prev.map((msg)=>{
        
           return msg._id === messageId 
          ? { ...msg, readBy: reader} 
          : msg
        })
      })
    })

    // getMessage()
    return () => {socket.off("receive-message");
      socket.off("typing")
      socket.off("Not-typing")
      socket.off("message-read")
    }
  }, [])

  const handleSend = () => {
    if (!input.trim()) return;
    
    socket.emit("send-message", {
      
      chatId: chatId,
      sender: user._id,
      content: input
    })
    setMessages((prev) => [...prev, { sender: user._id, content: input }]);
    setInput("");
    // getMessage()
  }

const handleTyping = (e)=>{
  setInput(e.target.value)
  socket.emit("typing" ,({sender:user?._id,chatId:chatId}))
  clearTimeout(typingTimeoutRef.current)
  typingTimeoutRef.current = setTimeout(()=>{
    socket.emit("Not-typing", ({sender:user?._id,chatId:chatId}))
  },1000)
}
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-[#4CAF50] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-2 sm:p-4">
        <h2 className="p-2 sm:p-3 text-xl font-semibold text-center">Chat Room</h2>
        <h4 className="p-2 sm:p-3 text-xl font-semibold text-center">Chat With {person}</h4>
        
        <div className="h-[60vh] md:h-[500px] overflow-y-scroll border border-gray-300 rounded p-2">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`my-1 ${m.sender === user?._id ? "text-right" : "text-left"}`}
            >
              <b>{m.sender === user?._id ? "Me" : "Them"}:</b>{m.content} {m.readBy?.length > 1 ? (
  <span className="text-xs text-green-500">✓✓ Read</span>
) : (
  <span className="text-xs text-gray-400">✓ Sent</span>
)}

            </div>
          ))}
          { typing && 
          <div>{person} is typing...</div>
          }
        </div>
        
        <div className="flex mt-3 gap-2">
          <input
            value={input}
            onChange={handleTyping}
            className="flex-1 border rounded p-2"
            placeholder="Type a message..."
          />
          <button 
            onClick={handleSend} 
            className="bg-green-600 text-white px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Chat
