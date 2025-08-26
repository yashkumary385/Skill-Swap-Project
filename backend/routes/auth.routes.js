import express from "express"
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();
router.post("/register",
    upload.single("image"),registerUser),
router.post("/login",loginUser)
export default router