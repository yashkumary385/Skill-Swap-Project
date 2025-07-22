import {Router}  from  "express"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.post("/",upload.single("image"),function(req,res) {
    res.send({
        message:"image uploaded ",
        imagePath : `${req.file.path}`
    })
    
}
)
export default router