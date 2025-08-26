import Router from "express"
import { chatMessage } from "../controllers/chat.controller.js";
import { verifyToken } from "../middlewares/authmiddleware.middleware.js";
const router = Router();
router.get("/message/:chatId",verifyToken, chatMessage)
export default router
