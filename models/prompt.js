import {Schema,models,model} from 'mongoose'
import User from './user';

const promptSchema=new Schema({
    creator:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    prompt:{
        type:String,
        required:[true,"Prompt is required"]
    },
    tag:{
        type:String,
        required:[true,"Tag is required"]
    },
    //maintaining an array of users who have liked the prompt
    likedBy:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]
    
})

const Prompt=models.Prompt||model("Prompt",promptSchema)
export default Prompt;