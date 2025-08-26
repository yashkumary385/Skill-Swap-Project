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

export const update = async (req, res) => {
  const userId = req.user?.id;
  console.log("User update route hit");

  if (!userId) {
    return res.status(400).json({ message: "User ID is invalid" });
  }

  try {
 
    const updateFields = { ...req.body };


    if (req.file) {
      console.log("File received:", req.file);

      const localFilePath = req.file.path;
      const upload = await uploadOnCloudinary(localFilePath);

      if (upload?.secure_url) {
        updateFields.image = upload.secure_url;
      } else {
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    if (updateFields.password) {
      updateFields.password = await bcrypt.hash(updateFields.password, 10);
    }

   
    if (req.body?.education) {
      try {
        updateFields.education = JSON.parse(req.body.education);
      } catch (err) {
        console.log("Invalid education JSON:", err.message);
      }
    }

    if (req.body?.skills) {
      try {
        updateFields.skills = JSON.parse(req.body.skills);
      } catch (err) {
        console.log("Invalid skills JSON:", err.message);
      }
    }

    if (req.body?.learned) {
      try {
        updateFields.learned = JSON.parse(req.body.learned);
      } catch (err) {
        console.log("Invalid learned JSON:", err.message);
      }
    }

    console.log("Final update fields:", updateFields);

    
    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password"); // exclude password in response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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