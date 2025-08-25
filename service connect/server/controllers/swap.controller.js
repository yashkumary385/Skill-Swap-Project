import SwapService from "../models/SwapService.js";
import Service from "../models/Service.js";
import { sendEmail } from "../utils/sendEmail.js";
import Notification from "../models/Notification.js";
import Chat from "../models/Chat.js"// adjust path to your folder
import User from "../models/User.js";
// import Cha
/// SEE THIS IS THE MOST IMPORTANT ONE NOW
export const createSwapRequest = async(req,res)=>{
    const {requesterServiceId , recepientServiceId ,status} = req.body; // here we are taking the service's id 
    const userId = req.user.id;
   // person cant make a swap for the same service of the recepient he has made the swap for .
   //You're trying to prevent a user from requesting a swap on the same recipient's service multiple times,
    try {
     const requesterService = await Service.findById(requesterServiceId) // we take the services id of the request and recepient 
    const recepientService = await Service.findById(recepientServiceId)
  
    
        const existingService = await SwapService.findOne({
            requester:userId,
            recepientService:recepientServiceId
        })
         
        if(existingService){
            return res.status(404).json({message:"request for same service not possible"})
        }
    if(!requesterServiceId || !recepientServiceId){
    return res.status(404).json("incorrect input either requesterid is incorrect or recepientid")
    }
    const swap = await SwapService.create({
      requester:userId, // 
      recepient: recepientService.user._id// this is the users id whose recpient request is this 
      , // intailly service conatoned the user id which was created by the user so both the ids requester and recepient were same .
      requesterService, // full service api 
      recepientService,
      status
    });
     const reqUser = await User.findById(userId);
     
    await Notification.create({
    user : recepientService.user._id ,
    message:`The request made by you for the serviceby ${recepientService.title} `,
   })  
    await Notification.create({
    user : requesterService.user._id ,
    message:`The request made to you for the service ${recepientService.title} by ${reqUser.name} and email ${requesterService.email}  inexchange of you service ${requesterService.title} `,
   })  
   const user = await User.findById(recepientService.user._id)
   await sendEmail(
  user.email,
      'New Service Request',
      `${requesterService.user.name} has requested your service "${recepientService.title}". Please check your SkillSwap dashboard.`
   )
   res.status(200).json({
  swap
   })
    } catch (error) {
        return res.status(404).json({message:"there is a problem",error:error.message})
    }
 
}
// Get all swap results

export const getSwap = async(req,res)=>{
    
    try {
        const swap= await SwapService.find({}) .populate('requester', 'name email')
      .populate('recepient', 'name email')
      .populate('requesterService', 'title')
      .populate('recepientService', 'title')

    res.status(200).json({ swap  })
    } catch (error) {
        return res.status(404).json({error:error.message})
        
    }
}
// get incoming request 
export const myReq = async(req,res)=>{ 
    let request =[];
    
    try{
     const userId = req.user.id;
     const incomingReq = await SwapService.find({recepient: userId}).populate('requester', 'name email')
      .populate('recepient', 'name email')
      .populate('requesterService', 'title')
      .populate('recepientService', 'title')
     for( const req of incomingReq){
      if(req.status === "pending" )
        request.push(req);
     }

   return res.status(200).json({request})

    }

     catch(error){
        return res.status(404).json({error:error.message})
     
     }


}

export const setUpdates = async(req,res)=>{ //status update or acceoting request with this
    try {
        const  swapId = req.params.id;
const { status } = req.body;
const  userId = req.user.id;
const io = req.app.get("io");
    
    
    const swap = await SwapService.findById(swapId)
    if (!swap) return res.status(404).json({ message: "Swap not found" });
console.log(swap)
    if (swap.recepient.toString() !== userId){ // userid is from the jwt so it is a string
      return res.status(403).json({ message: "Not authorized" });
    }
    
      if(!['pending' ,'accepted' , 'rejected'].includes(status) ){
         return res.status(400).json({ message: "Invalid status" });
      }

   swap.status = status;
   const user = await User.findById(swap.requester);

   await swap.save();

    if (status === 'accepted') { // i am sending the requester mail i am the recepient 
   let chat = await Chat.findOne({ swapId: swap._id });
if (!chat) {
  chat = await Chat.create({
    swapId: swapId,
    users: [swap.recepient,swap.requester],
    messages: [],
  });
}

      await sendEmail(
        user.email,
        'Your Request Was Accepted!',
        `Great news! Your request to swap your service  was accepted.`
      );

      // send the chat id to the fronend 
      [swap.requester , swap.recepient].forEach((user)=>{
      io.to(user.toString()).emit("swap-accepted",{
      chat:chat._id,
      swap:swap._id,
      message:"Chat Created Between Users"
      })
      })
       res.status(200).json({ message: `Request ${status}`, swap , chat:chat._id});
    }
     
    if (status === 'rejected') {
      await sendEmail(
        user.email,
        'Your Request Was Declined',
        `Unfortunately, your request to swap your service was declined.`
      );
      res.status(200).json({message:`Request ${status}`})
    }
  
        
    } catch (error) {
            res.status(500).json({ message: error.message });
    }


}

// request that i send 
export const outReq = async(req,res)=>{
       const page = parseInt(req.query.page);

       const limit = parseInt(req.query.limit);
         const skip = (page - 1 )*limit;
       let sortBy ={createdAt : -1}; 
    try{
     const userId = req.user.id;
    //  const requesterServiceDetails = await Service.findById(requesterService) // we take the services id of the request and recepient 
    // const recepientServiceDetails = await Service.findById(recepientService)
     const outgoingReq = await SwapService.find({requester: userId}).populate('requester', 'name email')
      .populate('recepient', 'name email')
      // .populate("requesterServiceDetails" ,"recepientServiceDetails" )
      .populate('requesterService', 'title') 
      // .populate('recepientService', 'title')
      .populate('recepientService', 'title').sort(sortBy).skip(skip).limit(limit)
       const total = await SwapService.countDocuments({requester : userId}); 
          const totalPages = Math.ceil(total/limit)
      

  
   return res.status(200).json({outgoingReq,total,totalPages })

    }

     catch(error){
        return res.status(404).json({error:error.message})
     
     }


}


export const acceptedReq = async(req,res)=>{
      try {
           const userId = req.user.id;
          let acceptedReq=[];
  
     const incomingReq = await SwapService.find({recepient: userId}).populate('requester', 'name email')
     .populate('recepient', 'name email')
      .populate('requesterService', 'title')
      .populate('recepientService', 'title')

 
    for (const swap of incomingReq) {
      if (swap.status === "accepted") {
        const chat = await Chat.find({ swapId: swap._id });
        acceptedReq.push({ swap, chat });
      }
    }
res.status(200).json({acceptedReq})
      } catch (error) {
        return res.status(404).json({error:error.message})
        
      }
}


export const outAccepted = async(req,res)=>{
           const userId = req.user.id;
          let outAcceptedReq=[];

           try {
             const outgoingReq = await SwapService.find({requester: userId}).populate('requester', 'name email')
      .populate('recepient', 'name email')
  
      .populate('requesterService', 'title') 
      
      .populate('recepientService', 'title')

   for (const swap of outgoingReq) {
      if (swap.status === "accepted") {
        const chat = await Chat.find({ swapId: swap._id });
        outAcceptedReq.push({ swap, chat });
      }
    }
           res.status(200).json({outAcceptedReq})

           } catch (error) {
        return res.status(404).json({error:error.message})
            
            
           }


}