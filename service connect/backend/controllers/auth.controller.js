import User from "../models/User.js";
import bcrypt from "bcrypt"
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"

// function to generate web token 

function generateWebToken (userId){
    const token = jwt.sign({id:userId},
        process.env.JWT_SEcRET,{
            expiresIn:"7d"
        }
    )
    return token;
}


export const registerUSer =async(req,res)=>{ // bcoz this is a post request it has a json body
   
    
    // try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
             return res.status(400).json({ errors: errors.array() });
        }
    const {name,email,password,bio,skills,education,learned} = req.body;
    // const image = req.file ? req.file.path :undefined
    const image = req.file ? `upload/${req.file.filename}` : "upload/default.png";

    const existuser = await User.findOne({ email   }) // first we check tht if th user exixts or not whetgher he already a login user
    if(existuser){
    //   return res.status(400).json({message:"user already exists"})
    res.status(404);
    throw new Error("user already present ")
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        bio,
        skills,
        image:image,
        education,
        learned
    })
    const createdUser = await User.findById(user._id).select("-password") // through this we hide the password in the api 
    // an error acn be throw here after chcecking createdYser
   return res.status(200).json({message:"user created succesfully",user:createdUser})
// }
// catch(error){
//     return res.status(404).json({message:"user not created",error:error.message})
// }

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
            return res.status(404).json("user doesn't exist")
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





