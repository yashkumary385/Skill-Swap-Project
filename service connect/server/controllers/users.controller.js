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
    const updateFields = { ...req.body };

        console.log(updateFields,"old");
      //   console.log(req.body.education);
      if (updateFields.password) {
        updateFields.password = await bcrypt.hash(updateFields.password, 10);
      }
    
    
    if("education" in req.body){
      const educationObj = JSON.parse(req.body.education);
      // console.log(educationObj, "this is obj ")
      updateFields.education = educationObj
    }
    if("skills" in req.body){ //  
      const skillsObj = JSON.parse(req.body.skills);
      updateFields.skills = skillsObj
    }
    if("learned" in req.body){
      const learnedObj = JSON.parse(req.body.learned);
      updateFields.learned = learnedObj
    }
   
    console.log(updateFields,"new");
    const user = await User.findByIdAndUpdate(userId,updateFields,
      { new: true, runValidators: true } // return updated doc + validate fields
    ) // exclude password from response


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