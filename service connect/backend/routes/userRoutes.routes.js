import { Router } from "express";
import { verifyToken } from "../middlewares/authmiddleware.middleware.js";
import { deleteTask , update, getAllUsers, getUser, getOtherUser} from "../controllers/users.controller.js";
const router = Router();
// router.get("/",verifyToken,getProfile)
router.put("/",verifyToken,update)
router.delete("/",verifyToken,deleteTask)
router.get("/",verifyToken,getAllUsers)
router.get("/current-user",verifyToken,getUser)
router.get("/:id",verifyToken,getOtherUser)
export default router;