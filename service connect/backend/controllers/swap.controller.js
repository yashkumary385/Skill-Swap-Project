import SwapService from "../models/SwapService.js";
import Service from "../models/Service.js";
import { sendEmail } from "../utils/sendEmail.js";
import Notification from "../models/Notification.js";




export const createSwapRequest = async(req,res)=>{
    const {requesterServiceId , recepientServiceId ,status} = req.body; // here we are taking the service's id 
    // console.log(requesterServiceId);
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
      requester: req.user.id, // 
      recepient: recepientService.user._id// this is the users id whose recpient request is this 
      , // intailly service conatoned the user id which was created by the user so both the ids requester and recepient were same .
      requesterService, // full service api 
      recepientService,status
    });
//    console.log(swapRequest);
console.log(recepientService.email);

    const notify=  await Notification.create({
    user : recepientService.user ,
    message:`The request made by you for the service ${recepientServiceId} `,
   })  


   await sendEmail(
  recepientService.email,
      'New Service Request',
      `${requesterService.user.name} has requested your service "${recepientService.title}". Please check your SkillSwap dashboard.`
   )
   res.status(200).json({
  swap
   })


   console.log(notify);
   


    } catch (error) {
        return res.status(404).json({message:"there is a problem",error:error.message})
    }
 
}
// Get all swap results

export const getSwap = async(req,res)=>{
    console.log('get swap is hit');
    
    try {
        const swap= await SwapService.find({}) .populate('requester', 'name email')
      .populate('recepient', 'name email')
      .populate('requesterService', 'title')
      .populate('recipientService', 'title')

    res.status(200).json({ swap  })
    } catch (error) {
        return res.status(404).json({error:error.message})
        
    }
}
// get incoming request 
export const myReq = async(req,res)=>{
    console.log("bitttchh");
    
    try{
     const userId = req.user.id;
     const incomingReq = await SwapService.find({recepient: userId}).populate('requester', 'name email')
      .populate('recepient', 'name email')
      .populate('requesterService', 'title')
      .populate('recipientService', 'title')
    res.status(200).json({ incomingReq  })

    }

     catch(error){
        return res.status(404).json({error:error.message})
     
     }


}

export const setUpdates = async(req,res)=>{ //status update
    try {
        const  serviceId = req.params.id;
const { status } = req.body;
const  userId = req.user.id;


    console.log(serviceId);
    console.log(userId ,"hii");
    
    
    const swap = await SwapService.findById(serviceId)
    if (!swap) return res.status(404).json({ message: "Swap not found" });

    if (swap.recepient.toString() !== userId) // userid is from the jwt so it is a string
      return res.status(403).json({ message: "Not authorized" });
    
      if(!['pending' ,'accepted' , 'rejected'].includes(status) ){
         return res.status(400).json({ message: "Invalid status" });
      }

   swap.status = status;

   await swap.save();

    if (status === 'accepted') {
      await sendEmail(
        swap.requester.email,
        'Your Request Was Accepted!',
        `Great news! Your request to swap your service "${swap.requesterService.title}" for "${swap.recepientService.title}" was accepted.`
      );
    }

    if (status === 'declined') {
      await sendEmail(
        swap.requester.email,
        'Your Request Was Declined',
        `Unfortunately, your request to swap your service "${swap.requesterService.title}" for "${swap.recipientService.title}" was declined.`
      );
    }

       res.status(200).json({ message: `Request ${status}`, swap });
        
    } catch (error) {
            res.status(500).json({ message: error.message });
    }


}


export const outReq = async(req,res)=>{
    // console.log("bitttchh");
    
    try{
     const userId = req.user.id;
     const incomingReq = await SwapService.find({requester: userId}).populate('requester', 'name email')
      .populate('recepient', 'name email')
      .populate('requesterService', 'title')
      .populate('recipientService', 'title')
    res.status(200).json({ incomingReq  })

    }

     catch(error){
        return res.status(404).json({error:error.message})
     
     }


}
