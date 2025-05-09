import { connectedToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const PUT=async(req)=>{
try {
   await connectedToDB();
   const {heart,postId}= await req.json(); 
   //{new:true} means "After updating, give me the new, updated document instead of the old one." to mongoose
   const updatedpost=await Prompt.findByIdAndUpdate(postId,{liked:heart},{new:true})
   return new Response(JSON.stringify(updatedpost),{status:200})
} catch (error) {
   return new Response(JSON.stringify({error:"Internal server error"}),{status:500})

}
}