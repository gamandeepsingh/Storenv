import {model,models,Schema} from "mongoose"

const envSchema = new Schema({
    projectName:{
        type:String,
        required:[true,"project name is required"],
    },
    envlist:[
        {
            name:{
                type:String,
                required:[true,"env name is required"],
            },
            value:{
                type:String,
                required:[true,"env value is required"],
            }
        }
    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true})

const Env = models.Env || model("Env",envSchema)
export default Env