import multer from "multer";
import path from "path"
import fs from "fs"
console.log("multerrrr hitttttt nowwwwwww ");

const uploadDir = "upload";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // this make upload stay on render
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
    console.log(req.file)
    
    
  },
  filename: function (req, file, cb) {
   
    const ext = path.extname(file.originalname)
        cb(null, 'image-' + Date.now() + ext);
    console.log(req.file);

  }

})
// check file type
function checkFileType(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]; // Use correct MIME types

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
  
}

export const upload = multer({
  storage: storage,
  fileFilter: checkFileType
});

