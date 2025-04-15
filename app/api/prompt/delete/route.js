import { connectedToDB } from "@utils/database";
import Prompt from '@models/prompt'
import mongoose from "mongoose";
export const DELETE=async(req)=>{
try{await connectedToDB();
const {postId}=await req.json();
const id= new mongoose.Types.ObjectId(postId)
const deletedPost=await Prompt.findOneAndDelete({_id:id})
if(!deletedPost){
    return new Response(JSON.stringify({error:"No post found"},{status:404}))

}
return new Response(JSON.stringify(deletedPost),{status:201})
}catch(error){
 return new Response({error:"error in deleting the post"},{status:500})
}

}