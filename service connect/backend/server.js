import express from "express"
import connectDb from "./config/db.js"
import dotenv from "dotenv"
import errorHandler from "./middlewares/errorHandler.midlleware.js"
import cors from  "cors"
import path from "path"

dotenv.config({
     path:"./.env" 
})
 connectDb();

// import path from "path"
 const app = express();
//  app(express.json());
app.use(express.json());

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)

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
app.use("/update",reqUpdate)


// notication

import notifyRoute from "./routes/notification.routes.js"
app.use("/notification",notifyRoute)


import markReadRoute from  "./routes/notification.routes.js"
// import errorHandler from "./middlewares/errorHandler.midlleware.js";
app.use("/markasread",markReadRoute)

app.use(errorHandler)


 const PORT = process.env.PORT || 3001;
try {
    app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`);
})
} catch (error) {
    console.log('server not responding');  
}
// console.log('"hiii');

