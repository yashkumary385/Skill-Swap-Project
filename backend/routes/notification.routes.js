import { markAllAsRead, notify } from "../controllers/notification.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/authmiddleware.middleware.js";
const router = Router();
router.get("/all",verifyToken,notify)
router.get("/notify",verifyToken,markAllAsRead)

export default router