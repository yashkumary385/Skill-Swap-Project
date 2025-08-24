import Notification from "../models/Notification.js";
export const notify = async(req,res)=>{ // to get the notifications 
    try {
            const userId= req.user.id;
            
    const notification = await Notification.find({user:userId}); //actually returns an array of documents, not a single object.
    

    res.status(200).json({message:"here are your notification" , notification})
    } catch (error) {
        return res.status(404).json({error:error.message})
        
    }
} 
    
export const markAllAsRead = async(req,res)=>{
    
    try {
         const userId = req.user.id;
         await Notification.updateMany({user:userId , isRead :false},{
            isRead:true
         },{new:true})
         res.status(200).json({message:"all notifiaction chaned to read"})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
        
   }
