import express from "express"
import connectDb from "./config/db.js"
import dotenv from "dotenv"
import errorHandler from "./middlewares/errorHandler.midlleware.js"
import cors from  "cors"
import Chat from "./models/Chat.js"
import Message from "./models/Messages.js"

import { Server } from "socket.io"
import http from "http"
dotenv.config({
     path:"./.env" 
})
 connectDb();

 
 const app = express();


 // server setup
 const server= http.createServer(app)
export const io = new Server(server,{
    cors:{origin :"*"}
})
app.set("io",io)
io.on("connection",(socket)=>{
    console.log(`User Connected With Socket Id : ${socket.id}`)
     
    socket.on("register-user", (userId)=>{ // as soon as the user loads int the authcontext  from the frontend 
        socket.join(userId) // this is a room and name of the room is userId

    })
    socket.on("send-message", async({chatId, sender,content})=>{
try {
     const chat = await Chat.findById(chatId)
     console.log(chatId,sender,content)
     console.log(chat ,'this is chat')
           if(!chat) return;
        //    chat.messages.push({sender , content}) // messages inside chat schema already store messageSchema
            await Message.create({
                sender:sender,
                content:content,
                chatId:chatId
            })
             chat.users.forEach((user) => {
                if (user.toString() !== sender) {
                    socket.to(user.toString()).emit("receive-message", {
                        sender,
                        chatId,
                        content
                    });
                }
            });
     console.log(chat ,'this is chat')
} catch (error) {
    console.log(error)
}  
    })
     

socket.on("disconnect",()=>{
        console.log(`User Disconnected with Socket Id : ${socket.id}`)
    
})
})


//
app.use(express.json());

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)



// Routes
app.use('/upload', express.static((process.cwd(), 'upload')));
//register route 
import  registerRoute from "./routes/auth.routes.js"
app.use("/api/auth",registerRoute)


import loginRoute from  "./routes/auth.routes.js";
app.use("/api/auth",loginRoute)

// import getuser
import getUserRoute from "./routes/userRoutes.routes.js"
app.use("/getUser",getUserRoute)

// import 
import updateRoute from "./routes/userRoutes.routes.js"
app.use("/updateUser",updateRoute)

import deleteRouter from  "./routes/userRoutes.routes.js"
app.use("/delete",deleteRouter)

import getAllRoute from "./routes/userRoutes.routes.js"
app.use("/getAll",getAllRoute)

import getSpecificUserRoute from "./routes/userRoutes.routes.js"
app.use("/users",getSpecificUserRoute)


import getOtherUserRoute from "./routes/userRoutes.routes.js"
app.use("/get/other",getOtherUserRoute)

import createRoute from "./routes/service.routes.js"
app.use("/api/service",createRoute)


import getServiceRoute from "./routes/service.routes.js"
app.use("/getServices",getServiceRoute)


import getUserServiceRoute from "./routes/service.routes.js"
app.use("/getUserService",getUserServiceRoute)




import getNotUserServiceRoute from "./routes/service.routes.js"
app.use("/get",getNotUserServiceRoute)





import updateServiceRoute from  "./routes/service.routes.js"
app.use("/updateService",updateServiceRoute)


import deleteServiceRoute from "./routes/service.routes.js"
app.use("/deleteService",deleteServiceRoute)

// import uploadRoute from "./routes/upload.routes.js"
// app.use("/uploadImage",uploadRoute)


import createSwapRoute from "./routes/swap.routes.js"
app.use("/api/swap",createSwapRoute)



import getSwapRoute from "./routes/swap.routes.js"
app.use("/getSwap",getSwapRoute)

import reqRoute from "./routes/swap.routes.js"
app.use("/requests",reqRoute)



import outRoute from "./routes/swap.routes.js"
app.use("/outRequest",outRoute)

import reqUpdate from "./routes/swap.routes.js"
app.use("/update",reqUpdate) // to accept


// notication

import notifyRoute from "./routes/notification.routes.js"
app.use("/notification",notifyRoute)


import markReadRoute from  "./routes/notification.routes.js"
// import errorHandler from "./middlewares/errorHandler.midlleware.js";
app.use("/markasread",markReadRoute)

import acceptedReqRoute from "./routes/swap.routes.js"
app.use("/",acceptedReqRoute)

import outAcceptedReqRoute from "./routes/swap.routes.js"
app.use("/",outAcceptedReqRoute)


// chat routes
import chatRoutes from "./routes/chat.routes.js"
app.use("/",chatRoutes)

app.use(errorHandler)


 const PORT = process.env.PORT || 3001;
try {
    server.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`);
})
} catch (error) {
    console.log('server not responding');  
}
// console.log('"hiii');

