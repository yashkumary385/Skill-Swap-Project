import { verifyToken } from "../middlewares/authmiddleware.middleware.js";
import { acceptedReq, createSwapRequest , getSwap, myReq , outAccepted, outReq, setUpdates   } from "../controllers/swap.controller.js";
import { Router } from "express";
const router = Router();
router.post("/create",verifyToken,createSwapRequest)
router.get("/",verifyToken,getSwap)
router.get("/incoming",verifyToken,myReq)
router.get("/outgoing",verifyToken,outReq)
router.put("/:id",verifyToken,setUpdates)
router.get("/incoming/accepted",verifyToken,acceptedReq)
router.get("/out/accepted",verifyToken,outAccepted)

export default router;