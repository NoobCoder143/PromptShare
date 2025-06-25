import { connectedToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const PUT=async(req)=>{
try {
   await connectedToDB();
   const {heart,postId,likedBy}= await req.json(); 
   const prompt= await Prompt.findById(postId)
   if(!prompt){return new Response("Prompt not found"),{status:404}}
   if(heart){
   if(!prompt.likedBy.includes(likedBy)){
      //adding the user to the array if not present
      prompt.likedBy.push(likedBy)
   }
   }
   else{
      prompt.likedBy=prompt.likedBy.filter(userId => userId.toString() !== likedBy)
    

   }
   prompt.save();
   return new Response(JSON.stringify(prompt),{status:200})
} catch (error) {
   return new Response(JSON.stringify({error:"Internal server error"}),{status:500})

}
}