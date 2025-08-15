import Message from "../models/Messages.js";

export const chatMessage =  async(req,res)=>{
    try {
        const chatId = req.params.chatId;
        console.log(chatId)
if(!chatId){
    return res.status(400).json({message : "Chat Id not provided"})
}
const messages = await Message.find({chatId})
if(!messages){
   return res.status(400).json({message:"Invalid ChatId"})
}
return res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error)
    }
}