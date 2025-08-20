import { v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";
dotenv.config();

   cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET 
    });


    const uploadOnCloudinary = async(localFilePath)=>{
       try {
        if(!localFilePath){
            return null;
        }
        // upload file on cloudonary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto" // checks itself the type of file we send to it 
        })
                // fs.unlinkSync(localFilePath) // we delete the file from our server immmediately after upload succesfull
                return response;

       } catch (error) {
         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return error;
       }
    }
    export default uploadOnCloudinary