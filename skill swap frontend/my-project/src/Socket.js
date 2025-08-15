import {io} from "socket.io-client"
const socket = io("http://localhost:8000")
   
export const joinUserRoom =(userId)=>{
    socket.emit("regitser-user", userId); // this registers the user and give it the socket id or the room name s
}

export const sendMessage = (chatId, sender , input)=>{
    console.log(chatId, sender , input)
    socket.emit("send-message", (chatId ,sender,input) )
}

export const recieveMessage = (callback)=>{
     socket.on("recieve-message", callback )
}

export const onSwapAccepted = (callback)=>{
socket.on("swap-accepted", (callback))
    
}   
  
export default socket


 