import User from "../models/User.js";
import bcrypt from "bcrypt"
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
        let image_url = null;
        
    const {name,username,email,password,bio,education} = req.body;
    const skills = req.body.skills ? JSON.parse(req.body.skills) : [];//mn
    const learned = req.body.learned ? JSON.parse(req.body.learned) : [];

if (req.file || req.file.path) {
const localPath = req.file.path.replace(/\\/g, "/");
const upload = await uploadOnCloudinary(localPath);
if (!upload) {
  return res.status(404).json({ message: "Image upload failed" });
}

image_url = upload.secure_url;
}else{
    image_url ="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
}
    const existuser = await User.findOne({ email   }) // first we check tht if th user exixts or not whetgher he already a login user
    if(existuser){
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
        image:image_url, 
        educationObj,
        learned
    })
  
    const createdUser = await User.findById(user._id).select("-password") // through this we hide the password in the api 

   return res.status(200).json({message:"user created succesfully",user:createdUser})
}
catch(error){
    return res.status(404).json({error:error.message})
}

}

export const loginUser =async(req,res)=>{
 console.log("login hitt")
        const {email ,  password } = req.body

    try {

        const existingUser = await User.findOne({email}) // this field has password stored in it whole user shema is being founded .
        if(!existingUser){
            return res.status(404).json("user doesn't exist or wrong username ")
        }

        const isValid = await bcrypt.compare(password,existingUser.password) // esxisting user pasword is the password of whos email is given password is the one stored in the schema 
        
        if(!isValid){
            return res.status(404).json("password is incorrect")
        }
           const token= generateWebToken(existingUser._id)
           
        return res.status(200).json({message:"login successsfull",token})
    } catch (error) {
        
    return res.status(404).json({message:"login unsuccessfull ",error:error.message})
    }
}




