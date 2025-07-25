import multer from "multer";
import path from "path"
import fs from "fs"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
    console.log(file.path);
    
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    const ext = path.extname(file.originalname)
        cb(null, 'image-' + Date.now() + ext);
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

