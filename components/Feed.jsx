"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const Feed = () => {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState([]);
  const [showLikedNotes, setshowLikedNotes] = useState(false);

  //this shows the liked notes when showLikedNotes is true
  const handleLikedNotes = (showLikedNotes) => {
    if (showLikedNotes) {
      const liked = posts.filter((post) => post.liked);
      setfilteredPosts(liked);
    } else {
      setfilteredPosts(posts);
    }
  };
  //this updates the liked feild of post immediately,really important cuz backend takes some time in doing that
  const handleLikeToggle = (postId, newHeart) => {
    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, liked: newHeart } : post
    );
    setPosts(updatedPosts);
    setfilteredPosts(updatedPosts); // also update the filtered list
  };

  const handleTextChange = (e) => {
    const changeText = e.target.value;
    setText(changeText);
    const regex = new RegExp(changeText, "i");
    if (showLikedNotes) {
      setfilteredPosts(filteredPosts.filter((post) => regex.test(post.tag)));
    } else {
      setfilteredPosts(posts.filter((post) => regex.test(post.tag)));
    }
  };
  useEffect(() => {
    const getAllposts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
      setfilteredPosts(data);
    };

    getAllposts();
  }, []);

  const handleDelete = async (post) => {
    try {
      const res = await fetch("/api/prompt/delete", {
        method: "DELETE",
        body: JSON.stringify({ postId: post._id }),
      });
      if (!res.ok) throw new Error("Failed to delete");

      const data = await res.json();

      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
      setfilteredPosts((prevFiltered) =>
        prevFiltered.filter((p) => p._id !== post._id)
      );
    } catch (error) {
      console.log("error in deleting prompt", error);
    }
  };

  return (
    <section className="Feed flex flex-col items-center">
      {/* Searchbar */}
      <div className="flex justify-center items-center w-full my-4">
        <input
          type="text"
          placeholder="Search by Tag "
          value={text}
          onChange={handleTextChange}
          className="min-w-0 flex-auto rounded-md bg-black/5 px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />
      </div>

      {/* Like toggle */}
      <div className="flex justify-end items-center w-full px-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-700 font-medium">
            Show Liked Notes
          </span>
          <button
            onClick={() => {
              const newHeart = !showLikedNotes;
              setshowLikedNotes(newHeart);
              handleLikedNotes(newHeart);
            }}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out
          ${
            showLikedNotes ? "bg-blue-600" : "bg-white border border-blue-600"
          }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300
            ${showLikedNotes ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>

      {/* PromptCards */}
      <div className="promptCards grid grid-cols-4 gap-4">
        {filteredPosts.length === 0 ? (
          <p className="col-span-4 text-center text-gray-500">
            No Prompts to display
          </p>
        ) : (
          filteredPosts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              edit={false}
              handleDelete={handleDelete}
              liked={post.liked}
              onLikeToggle={handleLikeToggle}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Feed;
