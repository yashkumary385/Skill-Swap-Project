import User from "../models/User.js";
import Service from "../models/Service.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import bcrypt from "bcrypt"
import { sendEmail } from "../utils/sendEmail.js";

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
  
 // adjust path if needed
// pu this to github and test



export const update = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you set req.user in auth middleware

    if (!userId) {
      return res.status(400).json({ message: "User ID is invalid" });
    }

    console.log("Incoming fields:", req.fields); // express-formidable puts form-data here

    const updateFields = { ...req.fields };

    // hash password if present
    if (updateFields.password) {
      updateFields.password = await bcrypt.hash(updateFields.password, 10);
    }

    // parse JSON string fields
    if (req.fields.skills) {
      updateFields.skills = JSON.parse(req.fields.skills);
    }

    if (req.fields.education) {
      updateFields.education = JSON.parse(req.fields.education);
    }

    if (req.fields.learned) {
      updateFields.learned = JSON.parse(req.fields.learned);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: error.message });
  }
};







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


export const deleteSkill = async(req,res)=>{
  // console.log(skill)
  try {
     const userId = req.user.id;
    //  console.log(userId)
  const {skill} = req.params
  console.log(skill," this is the incoming skill")
   const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { skills: skill } },
      { new: true } // return updated document
    );

     return res.status(200).json({message:"skill deleted refresh to see",updatedUser})
  } catch (error) {
    return res.status(404).json({message:"something went wrong",error:error.message})
    
  }
 
}





export const deleteLearn= async(req,res)=>{
 console.log("hiuu")
  try {
     const userId = req.user.id;
  const {learn} = req.params
  console.log(learn)
   const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { learned: learn } },
      { new: true } // return updated document
    );
     return res.status(200).json({message:"Learning deleted refresh to see",updatedUser})
  } catch (error) {
    return res.status(404).json({message:"something went wrong",error:error.message})
    
  }
 
}

export const forgotPassword =async(req,res)=>{
  const {email , password,password1}= req.body;
  console.log(email)
  try {
    if(password != password1){
      return res.status(400).json({message: "entered password needs to be same"})
  
    }
    if(!email){
       return res.status(400).json({message: "email is required"})
    }
    const user = await User.findOne({email})
    if(!user){
       return res.status(400).json({message:"user not found"})
    }
    const userId = user._id;
  const  hashedPassword = await bcrypt.hash(password, 10);
  
     await User.findByIdAndUpdate(userId , 
      { password: hashedPassword },   // <-- update object
      { new: true } 
    )
    
      await sendEmail(
        email,
        'Password Updated Succesfully',
        `${user.name} now you can log in `
         
      );

     return res.status(200).json({message:"Password Updated Succesfully"})  
  } catch (error) {
    return res.status(400).json({message:error})
    
  }
 


}