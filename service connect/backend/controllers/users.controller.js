import User from "../models/User.js";
import Service from "../models/Service.js";
import path from "path"
import uploadOnCloudinary, { deleteFromCloudinary } from "../utils/cloudinary.js";
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
//     if( req.file && req.file.path){
//       // console.log(req.file.path)
//     console.log(req.file,"this is file")

//   const localFilePath = req.file.path.replace(/\\/g, "/");
//          console.log(localFilePath)
//   const upload = await uploadOnCloudinary(localFilePath); /// file alredya there i dont know what happens next
// if (!upload) {
//   return res.status(404).json({ message: "Image upload failed" });
// }
// if("image" in req.file){
// updateFields.image = upload.secure_url
//     }
// console.log(upload)
    // }


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
    if("skills" in req.body){
      const skillsObj = JSON.parse(req.body.skills);
      updateFields.skills = skillsObj
    }
    if("learned" in req.body){
      const learnedObj = JSON.parse(req.body.learned);
      updateFields.learned = learnedObj
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








// delete task here 
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


// export const uploadImage = async(req,res)=>{
// const userId = req.user.id;
// const user = await User.findById(userId);
// if(!user){
//   return res.status(400).json("user not present")
// }
// let image_url;
// const delete = deleteFromCloudinary(user.image)
// // if(req.file && req.file.path){
// //   const localFilePath = req.file.path.replace(/\\/g, "/");
// //          console.log(localFilePath)
// //   // const deleteImage = await upl
// //   const upload = await uploadOnCloudinary(localFilePath); /// file alredya there i dont know what happens next
// // if (!upload) {
// //   return res.status(404).json({ message: "Image upload failed" });
// // }
// // }
// }



export const deleteSkill = async(req,res)=>{
  try {
     const userId = req.user.id;
  const {skill} = req.params
     await User.updateOne(
      {_id : userId},
      {$pull: {"skills" : `${skill}`}},
      {new:true}
    )
     return res.status(200).json({message:"skill deleted",update})
  } catch (error) {
    return res.status(404).json({message:"something went wrong",error:error.message})
    
  }
 
}