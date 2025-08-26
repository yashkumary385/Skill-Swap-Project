import Service from "../models/Service.js";
import User from "../models/User.js";



// creating service
export const createService = async(req,res)=>{
     
 const userId = req.user.id;

    const {title,description,type,cateogory} = req.body
    try{
      const userEmail = await User.findById(userId)
      
   
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
    if (search) {
  query.$or = [
    { title: { $regex: search,$options: 'i' } },
    { description: { $regex: search, $options: 'i' } }
  ];
}
    const services = await Service.find(query).populate("user","email name").skip(skip).limit(limit).sort(sortBy)   // populate user is from the token

    const total = await Service.countDocuments(services); 
    const totalPages = Math.ceil(total/limit)

    
        

   

    return res.status(200).json({message:"The services are",total,totalPages,services})
    }

    catch(error){
    return res.status(404).json({message:"there is a problem",error:error.message})

    }

}
 // update the services 

 export const updateService = async(req,res)=>{
    // only that user who has created the service can edit the service no other user can .
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
        
   })

    
    return res.status(200).json({message:"service updated",service})
        
    } catch (error) {
    return res.status(404).json({error:error.message})
        
    }
 }
 // delete the service 

 export const deleteService = async(req,res)=>{
    const taskId = req.params.id;


    try {
            if(!taskId){
    return res.status(404).json({message:"give service id"})
        
    }
    const service = await Service.findByIdAndDelete(taskId)
    
    return res.status(200).json({message:"service deleted",service})
    } catch (error) {
    return res.status(403).json({message:"something was wrong",error:error.message})
        
    }
 }








 export const getUsersService = async(req,res)=>{
    try{
      const userId = req.user.id;
       let sortBy ={createdAt : -1}; 
    
    const services = await Service.find({user:userId}).populate("user","email name").sort(sortBy)
    const total = await Service.countDocuments(services); 

   
  

    return res.status(200).json({message:"The services are",total,services})
    }

    catch(error){
    return res.status(404).json({message:"there is a problem",error:error.message})

    }

}



export const getNotUserService = async(req,res)=>{
  const user_id = req.user.id;
   const page = parseInt(req.query.page);
   const limit = parseInt(req.query.limit);

       let sortBy ={createdAt : -1}; 

  try {
      if(!user_id){
 
    return res.status(404).json({message:"there is some problem"})
  }
    const skip = (page - 1 )*limit; // skips the number of results before 

  const Notservices = await Service.find({
    user: { $ne: user_id }}).populate("user","email name").sort(sortBy).skip(skip).limit(limit)

    const total = await Service.countDocuments(  {user: { $ne: user_id }}); 
    const totalPages = Math.ceil(total/limit)


    return res.status(200).json({message:"The services dosent contain users services",total,totalPages,Notservices})


  } catch (error) {
    return res.status(404).json({message:"there is a problem",error:error.message})
    
  }
 
}