'use client'
import React from 'react';
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation';
const Form = () => {
  const {data:session}=useSession();//useSession retuens an object ,data:session is simply renaming the data object from useSessin to session
  console.log("session after creating prompt",session)
  const router=useRouter();
  const [post, setPost] = useState({
    prompt:"",
    tag:""
  })
  
const [isSubmitting, setisSubmitting] = useState(false)
  const handleSubmit=async(e)=>{
    e.preventDefault();
     setisSubmitting(true);
   try {
    const res= await fetch('/api/prompt/new',
      {
        method:'POST',
        body:JSON.stringify({
         prompt:post.prompt,
         userId:session?.id,
         tag:post.tag
        })
        
        
      }
    )
    
console.log("Data Sent to API:", JSON.stringify({
  prompt: post.prompt,
  userId: session?.user?.id,
  tag: post.tag
}, null, 2));
 
    if(res.ok){
      router.push('/')
    }
    else{
      const text= await res.text();
      console.log(text)
    }
   } catch (error) {
    console.log(error)
   }finally{
    setisSubmitting(false);
   }
  }
  return (
    <>
      <form  onSubmit={handleSubmit}>
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-12 mt-9">
         < h2 className="text-base/7 font-semibold text-gray-900 ">Share Prompt</h2>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
             
              <div className="col-span-full">
               
                <div className="textarea">
                  <textarea
                    id="Prompt"
                    name="Prompt"
                    rows={6}
                   
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={post.prompt}
                     onChange={(e)=>{setPost({...post,prompt:e.target.value})}}
                  />
                </div>
                
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                  Tag
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                 
                    <input
                      id="Tag"
                      name="Tag"
                      type="text"
                      placeholder="webdevelopment,self-improvement"
                      value={post.tag}
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      onChange={(e)=>{setPost({...post,tag:e.target.value})}}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
         >
               {isSubmitting?"Saving ....":"Save"}
          </button>
       
        </div>
      </form>
    </>
  );
};

export default Form;
