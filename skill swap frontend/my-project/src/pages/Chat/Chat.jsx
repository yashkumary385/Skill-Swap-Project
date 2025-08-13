import React, { useEffect } from 'react'
import socket , {joinUserRoom} from "../../Socket.js"
import { useAuth } from '../../context/AuthContext'



const Chat = () => {
    const {user} = useAuth();
    joinUserRoom(user._id)

 
  return (
    <div>
      here is your chat ui
    </div>
  )
}

export default Chat
