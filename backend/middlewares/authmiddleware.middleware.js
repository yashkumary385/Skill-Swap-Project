import jwt from "jsonwebtoken"

export const verifyToken = async(req,res,next)=>{
    console.log("verify token hit");
    const jwtsecret = process.env.JWT_SECRET;
const authHeader = req.headers.authorization; 
    try{
if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(404).json("Invalid")
}
console.log("JWT secret at login:", process.env.JWT_SECRET);
if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "JWT secret not found!" });
}

const token = authHeader.split(' ')[1];

const decodeId= jwt.verify(token

,jwtsecret)

// Attach user to request (without password)
req.user = decodeId// wea added the deatilas to the req and we send it on to the controller to show the details
// console.log(req.user); //{ id: '686689461f948872451842df', iat: 1751550303, exp: 1752155103 }

// const user = await User.findOne(token)
next(); // we send the control to the controller 
// res.status(200).json({message:"here is the info of the logged in user"})
}
catch(error){
    return res.status(404).json({message:"some error " ,error:error.message})
}
}