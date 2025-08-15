import Chat from "../models/Chat.js";


export const chatMessage =  async(req,res)=>{
    try {
        const chatId = req.params.chatId;
if(!chatId){
    return res.status(400).json({message : "Chat Id not provided"})
}
const chat = await Chat.findById(chatId)
if(!chat){
    res.status(400).json({message:"Invalid ChatId"})
}
res.status(200).json(chat)
    } catch (error) {
        res.status(400).json(error)
    }
}