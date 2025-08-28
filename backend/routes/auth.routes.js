import express from "express"
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import formidableMiddleware from "express-formidable";

const router = express.Router();
router.post("/register",
    upload.single("image"),formidableMiddleware(),registerUser),
router.post("/login",loginUser)
export default router