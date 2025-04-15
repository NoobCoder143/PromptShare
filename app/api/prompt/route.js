import { connectedToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET =async (request)=>{
  try {
    await connectedToDB();
    const posts= await Prompt.find({}).populate("creator")
  

    return new Response(JSON.stringify(posts),{status:200})
  } catch (error) {
    console.error("API Error:", error); 
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), { status: 500 });
  }
}