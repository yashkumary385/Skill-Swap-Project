import Service from "../models/Service.js";
import { upload } from "../middlewares/multer.middleware.js";
import User from "../models/User.js";
import fs from "fs"



// creating service
export const createService = async(req,res)=>{
     
 const userId = req.user.id;
 console.log("create service route hittt")

     const image = req.file ? `/uploads/${req.file.filename}` : null;

    const {user,title,description,type,cateogory} = req.body
    try{
      const userEmail = await User.findById(userId)
      // console.log('');
      
   
    if(!userId){
    return res.status(404).json("user id is invalid")
    }
    const createdService = await Service.create( {
        user:userId,
        title,
        description,
        type,
        cateogory :cateogory.toLowerCase(),
        email:userEmail.email,
       
    });
    return res.status(200).json({message:"service created",createdService})
}
catch(error){
    return res.status(404).json({error:error.message})
}
}


// get all services
//pagination implemented 
export const getService = async(req,res)=>{
   
    try{
      const userId = req.user.id;
    const {type,search,cateogory} = req.query; // query is the query parameters
   const page = parseInt(req.query.page);
   const limit = parseInt(req.query.limit);
   let sortBy ={createdAt : -1}; // resassinment possible in let
    const query ={}
    if(req.query.sort == "oldest") sortBy = {createdAt:1};
    if(req.query.sort == "az") sortBy = {title:1};
    if(req.query.sort == "za") sortBy = {title:-1};

    if(type){
        query.type  = type.toLowerCase();;
    }
    if(cateogory){
        query.cateogory = cateogory.toLowerCase()
    }
    const skip = (page - 1 )*limit; // skips the number of results before 
    // if(search){ // If you want to match the search term in either title or description, use $or:
    //     // check
    //     query.$or=[
    //   {title:{ $regex :search , $options:"i"}},
    // {description:{ $regex :search , $options:"i"}}
    // ];
    // }
    if (search) {
  query.$or = [
    { title: { $regex: search,$options: 'i' } },
    { description: { $regex: search, $options: 'i' } }
  ];
//   query=  { title: { $regex: search, $options: 'i' } }
}
    // console.log(query);
    // console.log(JSON.stringify(query, null, 2));
    const services = await Service.find(query).populate("user","email name").skip(skip).limit(limit).sort(sortBy)   // populate user is from the token

    const total = await Service.countDocuments(services); 
    const totalPages = Math.ceil(total/limit)
    console.log(total);
        

    //A Service.find({}) means: if nothins passed query remains empty and return all services
    // const services = await Service.find({})

    return res.status(200).json({message:"The services are",total,totalPages,services})
    }

    catch(error){
    return res.status(404).json({message:"there is a problem",error:error.message})

    }

}
 // update the services 

 export const updateService = async(req,res)=>{
    // only that user who has created the service can edit the service no other user can .
    console.log("update service route has being hit");
      const userId = req.user.id;
      const taskId = req.params.id
      try {
  
    if(!userId){
    return res.status(404).json({message:"invalid user id"})

    }
    const updateFields = req.body
    if(!updateFields){
    return res.status(404).json({message:"give proper credentials"})

      }
    // const service = await Service.findByIdAndUpdate(taskId,updateFields,{
    //     new:true,
    // })
   await Service.findByIdAndDelete(taskId);
   const service = await Service.create({ /// in order to get the most updated thing up 
     user:userId,
        title:req.body.title,
        description:req.body.description,
        type:req.body.type,
        cateogory :req.body.cateogory.toLowerCase(),
        // email:userEmail.email,
        // image:`/upload/${image}`
   })

    // console.log(service);
    // if(!service)
    // {
    // return res.status(404).json({message:"error occurred"})


    // }
    
    return res.status(200).json({message:"service updated",service})
        
    } catch (error) {
    return res.status(404).json({error:error.message})
        
    }
 }
 // delete the service 

 export const deleteService = async(req,res)=>{
  console.log("delete route hitt")
    const taskId = req.params.id;
    const userId = req.user.id;


    try {
            if(!taskId){
    return res.status(404).json({message:"give service id"})
        
    }
    const service = await Service.findByIdAndDelete(taskId)
    // await Service.deleteMany({user:userId})
    return res.status(200).json({message:"service deleted",service})
    } catch (error) {
    return res.status(403).json({message:"something was wrong",error:error.message})
        
    }
 }








 export const getUsersService = async(req,res)=>{
   console.log("get users service route is hit")
    try{
      const userId = req.user.id;
       let sortBy ={createdAt : -1}; 
      // console.log(userId)
    
    const services = await Service.find({user:userId}).populate("user","email name").sort(sortBy)

   
    //A Service.find({}) means: if nothins passed query remains empty and return all services
    // const services = await Service.find({})

    return res.status(200).json({message:"The services are",services})
    }

    catch(error){
    return res.status(404).json({message:"there is a problem",error:error.message})

    }

}