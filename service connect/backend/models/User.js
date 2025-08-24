import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username:{

        "type":String,
        "required":false
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        "type": String,
        "required": true
    },
    bio: {
        "type": String,
        "required": false
    },
    skills: [
      String
    ],
    image: {
  
    type:String
    }
    ,
    education:
        [
            {
                instituition: {
                    "type": String,
                    default: ""
                },
                degree: {
                    "type": String,
                    default: ""
                },
                startDate: {
                    "type": String,
                    default: null
                },
                endDate: {
                    "type": String,
                    default: null
                },
                score: {
                    "type": Number,
                    default: 0
                }
            }

        ],
    learned: [
     String
    ]


}, { timestamps: true })

export default mongoose.model("User", userSchema)

