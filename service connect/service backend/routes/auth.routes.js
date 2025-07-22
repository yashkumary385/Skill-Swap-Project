import { Router } from "express";
import express from "express"
import { loginUser, registerUSer } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();
router.post("/register",
    upload.single("image"),
      [
    body("name").notEmpty().withMessage("enter a valid name"),
    body("password").isLength({ min: 3 }).withMessage("enter either 3 or more"),
    body("email").isEmail().withMessage("Valid email is required")
  ],registerUSer),
router.post("/login",loginUser)
export default router