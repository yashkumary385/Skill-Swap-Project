import { v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";
// dotenv.config();
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env.development" });
  }
  console.log("Cloudinary loaded:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ loaded" : "❌ missing"
  });
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
    // console.log(api_key)
    // console.log(process.env.CLOUDINARY_API_KEY,"this is key")


    const uploadOnCloudinary = async(localFilePath)=>{
       try {
        if(!localFilePath){
            return null;
        }
        // upload file on cloudonary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto" // checks itself the type of file we send to it 
        })
        console.log("Uploading with Cloudinary config:", cloudinary.config());

             
        // fs.unlinkSync(localFilePath) // we delete the file from our server immmediately after upload succesfull
                  fs.unlinkSync(localFilePath) 
        return response;



       } catch (error) {
        console.log(error)
         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return error;
       }
    }


   export const deleteFromCloudinary = async(publicId)=>{
            if(!publicId){
                return ;
            }
            try {
                const response = await cloudinary.uploader.destroy(publicId)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
    }
    export default uploadOnCloudinary