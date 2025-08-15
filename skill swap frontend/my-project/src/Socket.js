import {io} from "socket.io-client"
const socket = io("http://localhost:8000")
   
export const joinUserRoom =(userId)=>{
    socket.emit("regitser-user", userId); // this registers the user and give it the socket id or the room name s
    console.log(userId);
}

export const sendMessage = (chatId, sender , content)=>{
    console.log(chatId,sender,content)
    socket.emit("send-message", (chatId ,sender,content) )
}

export const recieveMessage = (callback)=>{
     socket.on("recieve-message", callback )
}

export const onSwapAccepted = (callback)=>{
socket.on("swap-accepted", (callback))
    
}   
  
export default socket


 