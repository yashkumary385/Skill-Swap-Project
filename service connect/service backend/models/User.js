import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
type:String,
required:true,
unique:true

},
password:{
    "type":String,
    "required":true
} , 
bio:{
    "type":String,
    "required":false
},
skills:[
    {
        "type":String,
        required:false
    }
],
image:{
    "type":String,
    // default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ",
    
}

},{timestamps:true})

export default mongoose.model("User",userSchema)