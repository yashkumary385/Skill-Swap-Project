import { Router } from "express";
import { verifyToken } from "../middlewares/authmiddleware.middleware.js";
import formidableMiddleware from "express-formidable";

import { deleteTask , update, getAllUsers, getUser, getOtherUser, deleteSkill, forgotPassword, deleteLearn} from "../controllers/users.controller.js";
const router = Router();
// router.get("/",verifyToken,getProfile)
router.put("/update",verifyToken,formidableMiddleware(),update)
router.delete("/deleteProfile",verifyToken,deleteTask)
router.get("/",verifyToken,getAllUsers)
router.get("/current-user",verifyToken,getUser)
router.get("/:id",verifyToken,getOtherUser)
router.delete("/:skill",verifyToken,deleteSkill)
router.delete("/learned/:learn",verifyToken,deleteLearn)
router.patch("/resetPassword",forgotPassword)
export default router;


