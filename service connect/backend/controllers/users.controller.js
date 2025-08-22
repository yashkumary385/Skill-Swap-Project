import User from "../models/User.js";
import Service from "../models/Service.js";
import path from "path"
import uploadOnCloudinary from "../utils/cloudinary.js";
import bcrypt from "bcrypt"

//  export const getProfile = async(req,res)=>{
//     console.log('user route hit');
    
//     const userId = req.user.id;
//     try{
//     if(!userId){
//     return res.status(404).json("user id is invalid")
//     }
//     const user = await User.findById(userId).select("-password ");
//     return res.status(200).json(user)
// }
//     catch(error){
//     return res.status(404).json({message:"something went wrong",error:error.message})
//     }
//  }
  
 export const update = async(req,res)=>{
    const userId = req.user.id;
    console.log("user update route hit")
    // const {email,name} = req.body;

    try {
           if(!userId){
    return res.status(404).json("user id is invalid")
    }
    console.log(req.file,"this is file")
    if( req.file){
      // console.log(req.file.path)
         const localFilePath = req.file.path;
         console.log(localFilePath)
  const upload = await uploadOnCloudinary(localFilePath); /// file alredya there i dont know what happens next
if (!upload) {
  return res.status(404).json({ message: "Image upload failed" });
}else{
    if("image" in req.body){
      updateFields.image = upload.secure_url
    }
}
console.log(upload)
    }
    const updateFields = req.body;
      //   console.log(req.body,"old");
      //   console.log(req.body.education);
    if("password" in req.body ){
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        updateFields.password = hashedPassword
    }
    if("education" in req.body){
      const educationObj = JSON.parse(req.body.education);
      // console.log(educationObj, "this is obj ")
      updateFields.education = educationObj
    }
   
   //  console.log(req.body,"new");
    const user = await User.findByIdAndUpdate(userId,updateFields,{
        new:true
    })
    // const user = await User.findById(userId)
    return res.status(200).json(user)

    } catch (error) 
    {
    return res.status(404).json({error:error.message})
        
    }
 }


 export const deleteTask= async(req,res)=>{
    const userId = req.user.id;
        try {
           if(!userId){
    return res.status(404).json("user id is invalid")
    }
  const user = await User.findByIdAndDelete(userId)
    await Service.deleteMany({user:userId})

   return res.status(200).json({message:"user deleted",user})
 }
 catch(error){
    return res.status(404).json({error:error.message})

 }
}
export const getAllUsers = async(req,res)=>{
   console.log('getall user route hit ');
     const userId = req.user.id;
    try{
    if(!userId){
    return res.status(404).json("user id is invalid");
    }
    const user = await User.find({}).select("-password")
    return res.status(200).json({message:"here are all the users",user})
   }catch(error){
    return res.status(404).json({message:"something went wrong",error:error.message});
   }
}


export const getUser = async(req,res)=>{
   console.log("personal route hit ")
   const userId = req.user.id;
     try{
    if(!userId){
    return res.status(404).json("user id is invalid")
    }
    const user = await User.findById(userId).select("-password")
    return res.status(200).json(user)
   }catch(error){
    return res.status(404).json({message:"something went wrong",error:error.message})
   
   }

 
}
export const getOtherUser = async(req,res)=>{
   console.log("personal route hit ")
   const {id} = req.params
     try{
   
    const user = await User.findById(id).select("-password")
     if(!user){
    return res.status(404).json("user id is invalid")
    }
    return res.status(200).json(user)
   }catch(error){
    return res.status(404).json({message:"something went wrong",error:error.message})
   
   }

 
}