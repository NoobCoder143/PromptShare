'use client'
import {useState,useEffect} from 'react'
import PromptCard from './PromptCard';
const Feed = () => {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);
  const[filteredPosts,setfilteredPosts]=useState([])
  const handleTextChange=(e)=>{
    const changeText=e.target.value
    setText(changeText)
    const regex=new RegExp(changeText,"i");
    setfilteredPosts(posts.filter(post=>regex.test(post.tag)))
    
  }
  useEffect( () => {
    const getAllposts=async()=>{
      const res= await fetch("/api/prompt");
    const data= await res.json();
    
    setPosts(data);
    setfilteredPosts(data)
    }
    
    getAllposts();
  }, [])
  const handleDelete = async (post) => {
    try {
      const res = await fetch("/api/prompt/delete", {
        method: "DELETE",
        body: JSON.stringify({ postId: post._id }),
      });
      if (!res.ok) throw new Error("Failed to delete");

      const data = await res.json();
     
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
      setfilteredPosts((prevFiltered) => prevFiltered.filter((p) => p._id !== post._id));
      
    } catch (error) {
      console.log("error in deleting prompt", error);
    }
  };
  
  
  return (
    <section className='Feed flex flex-col items-center'>
      <div className='flex justify-center items-center w-full my-4'>
      
       <input
       type='text'
       placeholder='Search by Tag '
       value={text}
       onChange={handleTextChange}
       className='min-w-0 flex-auto rounded-md bg-black/5 px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 '
       />
      </div>
      <div className='promptCards grid grid-cols-4 gap-4'>
          {filteredPosts.map(post=>(<PromptCard
          key={post._id}
          post={post}
          edit={false}
          handleDelete={handleDelete}/>))}
      </div>
      </section>
  )
}

export default Feed