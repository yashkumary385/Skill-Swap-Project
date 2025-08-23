import { Router } from "express";
import { verifyToken } from "../middlewares/authmiddleware.middleware.js";
import { deleteTask , update, getAllUsers, getUser, getOtherUser, deleteSkill} from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
// router.get("/",verifyToken,getProfile)
router.put("/",upload.single("image"),verifyToken,update)
router.delete("/",verifyToken,deleteTask)
router.get("/",verifyToken,getAllUsers)
router.get("/current-user",verifyToken,getUser)
router.get("/:id",verifyToken,getOtherUser)
router.put("/:skill",verifyToken,deleteSkill)
export default router;