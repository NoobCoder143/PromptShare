'use client'
import React from 'react'
import { useState,useEffect} from 'react'
import { useSession } from 'next-auth/react'
import PromptCard from '@components/PromptCard'
const page = () => {
    const{data:session}=useSession();
    const [posts, setposts] = useState([])
    useEffect(() => {
      const getuserPosts=async()=>{
       const res=await fetch('/api/prompt')
       const data= await res.json();
       setposts(data);
      }
    
     getuserPosts()
    }, [])
    const handleDelete = async (post) => {
      try {
        const res = await fetch("/api/prompt/delete", {
          method: "DELETE",
          body: JSON.stringify({ postId: post._id }),
        });
        if (!res.ok) throw new Error("Failed to delete");

        const data = await res.json();
        setposts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
      } catch (error) {
        console.log("error in deleting prompt", error);
      }
    };
    
  return (
    <div className='flex flex-wrap gap-4'>
    
       {posts.map(post=>(session?.user?.email===post.creator.email&&<PromptCard key={post._id} post={post} edit={true} handleDelete={handleDelete}/>))}
    </div>
  )
}

export default page