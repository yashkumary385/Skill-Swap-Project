import User from "../models/User.js";
import bcrypt from "bcrypt"
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import uploadOnCloudinary from "../utils/cloudinary.js";
// function to generate web token 

function generateWebToken (userId){
    const token = jwt.sign({id:userId},
        process.env.JWT_SEcRET,{
            expiresIn:"7d"
        }
    )
    return token;
}


export const registerUser =async(req,res)=>{ // bcoz this is a post request it has a json body
   
    
    try{
        let imageData=null
        const errors = validationResult(req)
        if(!errors.isEmpty()){
             return res.status(400).json({ message:"what errors",errors: errors.array() }); // image not cmong from the multer but multre hitt occurs 
        }
    const {name,username,email,password,bio,education} = req.body;
    const skills = req.body.skills ? JSON.parse(req.body.skills) : [];
    const learned = req.body.learned ? JSON.parse(req.body.learned) : [];

// console.log(name,username,email,password,bio,skills,education,learned)
    // const image = req.file ? req.file.path :undefined
    // console.log(req.file, "this is req file") // file is not coing to undesfined is getting printed 

    if (req.file && req.file.path)  {
           
const localPath = req.file.path.replace(/\\/g, "/") ;
const upload = await uploadOnCloudinary(localPath);
if (!upload) {
  return res.status(404).json({ message: "Image upload failed" });
} 

/// come back here and fix this up.......
    console.log(upload,"this is upload")

   imageData = {
        url: upload.secure_url,
        public_id: upload.public_id,
      };
    
// console.log(req.file.path, " this is file path");
// 
}else{
    image_url=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ";
}
// Upload local file to Cloudinary
// console.log(image,"this is image")


    const existuser = await User.findOne({ email   }) // first we check tht if th user exixts or not whetgher he already a login user
    if(existuser){
    //   return res.status(400).json({message:"user already exists"})
    res.status(404);
    throw new Error("user already present ")
    }
    const hashedPassword = await bcrypt.hash(password,10);
  const educationObj = JSON.parse(education);
    const user = await User.create({
        name,
        username,
        email,
        password:hashedPassword,
        bio,
        skills,
        image:imageData, 
        educationObj,
        learned
    })
    console.log(user,"this is user")
    const createdUser = await User.findById(user._id).select("-password") // through this we hide the password in the api 
    // an error acn be throw here after chcecking createdYser
   return res.status(200).json({message:"user created succesfully",user:createdUser})
}
catch(error){
    return res.status(404).json({error:error.message})
}

}

export const loginUser =async(req,res)=>{
    //  console.log('route hit');
        const {email ,  password } = req.body
        //  console.log(email);
        //  console.log(password);
    try {

        // const userid = await User.findById()
        const existingUser = await User.findOne({email}) // this field has password stored in it whole user shema is being founded .
        if(!existingUser){
            return res.status(404).json("user doesn't exist or wrong username ")
        }

        const isValid = await bcrypt.compare(password,existingUser.password) // esxisting user pasword is the password of whos email is given password is the one stored in the schema 
        // console.log(isValid);
        
        if(!isValid){
            return res.status(404).json("password is incorrect")
        }
           const token= generateWebToken(existingUser._id)
        //    console.log(token);
           
        return res.status(200).json({message:"login successsfull",token})
    } catch (error) {
        // console.log(error);
        
    return res.status(404).json({message:"login unsuccessfull ",error:error.message})
    }
}





