import Prompt from "@models/prompt"
import { connectedToDB } from "@utils/database"
export const PUT=async(req)=>{
 try{ await connectedToDB();
  const {newprompt,post,userId,newtag}= await req.json();
 

  const updatedpost= await Prompt.findOneAndUpdate({creator:userId,prompt:post.prompt,tag:post.tag},{$set:{prompt:newprompt,tag:newtag}},{new:true})
  if(!updatedpost){
    return new Response(JSON.stringify({error:"post not found"}),{status:404})
  }
  return new Response(JSON.stringify(updatedpost),{status:200})} 
  catch(error){
    return new Response(JSON.stringify({error:"Internal Server error"}),{status:500})
  }
}