import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import uploadOnCloudinary from "../utils/cloudinary.js";
// function to generate web token 

function generateWebToken (userId){
    const token = jwt.sign({id:userId},
        process.env.JWT_SECRET,{
            expiresIn:"7d"
        }
    )
    return token;
}


export const registerUser = async (req, res) => {
  try {
    let image_url = null;

    const { name, username, email, password, bio, education } = req.body;

    let skills = [];
    if (req.body.skills) {
      try {
        skills = JSON.parse(req.body.skills);
      } catch {
        return res.status(400).json({ error: "Invalid JSON in skills field" });
      }
    }

    let learned = [];
    if (req.body.learned) {
      try {
        learned = JSON.parse(req.body.learned);
      } catch {
        return res.status(400).json({ error: "Invalid JSON in learned field" });
      }
    }

    let educationObj = {};
    if (education) {
      try {
        educationObj = JSON.parse(education);
      } catch {
        return res.status(400).json({ error: "Invalid JSON in education field" });
      }
    }

    if (req.file && req.file.path) {
      const localPath = req.file.path.replace(/\\/g, "/");
      const upload = await uploadOnCloudinary(localPath);
      if (!upload) {
        return res.status(404).json({ message: "Image upload failed" });
      }
      image_url = upload.secure_url;
    } else {
      image_url = "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg";
    }

    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      bio,
      skills,
      image: image_url,
      educationObj,
      learned,
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser =async(req,res)=>{
 console.log("login hitt")
        const {email ,  password } = req.body
        console.log(email);
        

    try {

        const existingUser = await User.findOne({email}) // this field has password stored in it whole user shema is being founded .
        if(!existingUser){
            return res.status(404).json("user doesn't exist or wrong username ")
        }

        const isValid = await bcrypt.compare(password,existingUser.password) // esxisting user pasword is the password of whos email is given password is the one stored in the schema 
        
        if(!isValid){
            return res.status(404).json("password is incorrect")
        }
           const token= generateWebToken(existingUser._id)
           
        return res.status(200).json({message:"login successsfull",token})
    } catch (error) {
        
    return res.status(404).json({message:"login unsuccessfull ",error:error.message})
    }
}




