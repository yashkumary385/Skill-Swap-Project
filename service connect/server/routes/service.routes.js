import { createService , getService , updateService , deleteService } from "../controllers/service.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/authmiddleware.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getUsersService } from "../controllers/service.controller.js";
import { getNotUserService } from "../controllers/service.controller.js";
const router = Router();
router.post("/create",verifyToken,upload.single("image"),createService)
router.get("/",verifyToken,getService)
router.get("/users",verifyToken,getUsersService)
router.put("/:id",verifyToken,updateService)
router.delete("/:id",verifyToken,deleteService)
router.get("/notUser",verifyToken,getNotUserService)

export default router