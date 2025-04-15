import { connectedToDB } from "@utils/database"
import Prompt from "@models/prompt"     
import mongoose from 'mongoose'
export const POST=async(req)=>{
    try {
    await connectedToDB();
 const {userId,prompt,tag}= await req.json();
 
 const creatorId = new mongoose.Types.ObjectId(userId);
   const newPrompt= await Prompt.create({
        creator:creatorId,
        prompt:prompt,
        tag:tag
    })
    await newPrompt.save();
    
    
    return new Response(JSON.stringify(newPrompt), { status: 201 }); 
 } 
 catch (error) {
    console.log(error);
    return new Response("Failed to create post", { status: 500 }); }
}