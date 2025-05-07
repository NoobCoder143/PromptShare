"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const PromptCard = ({ post, edit, handleDelete }) => {
  const [copy, setcopy] = useState("");
  const [Post, setPost] = useState(post);
  const [updatedPrompt, setupdatedPrompt] = useState(post.prompt);
  const [updatedTag, setupdatedTag] = useState(post.tag);
  const { data: session } = useSession();
  const [editModal, seteditModal] = useState(false);
  const [showModal, setshowModal] = useState(false);
  console.log("POST====", post);
  const handleCopy = () => {
    setcopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setcopy("");
    }, 5000);
  };
  const handleSave = async () => {
    try {
      const res = await fetch("/api/prompt/edit", {
        method: "PUT",
        body: JSON.stringify({
          newprompt: updatedPrompt,
          post,
          newtag: updatedTag,
          userId: session?.id,
        }),
      });
      const response = await res.json();
      setPost((Post) => ({
        ...Post,
        prompt: response.prompt,
        tag: response.tag,
      }));
    } catch (error) {
      console.log("error in editing prompt", error);
    }
  };

  return (
    <div
      className={`max-w-sm rounded-lg border border-gray-200 bg-white shadow-md p-4 mt-6 relative ${
        !edit ? "cursor-pointer" : ""
      }`}
      onClick={() => setshowModal(true)}
    >
      <div>
        <Image
          src={Post.creator.image}
          alt="user_profile"
          width={40}
          height={40}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        {Post.creator.username}
      </h3>
      <h5 className="text-lg font-semibold text-sm text-gray-600">
        {Post.creator.email}
      </h5>
      <p className="mt-2 text-sm text-gray-600">
        {Post.prompt.length > 150
          ? Post.prompt.slice(0, 90) + "..."
          : Post.prompt}
      </p>
      <div className="mt-3 inline-block rounded-md bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-600">
        #{Post.tag}
      </div>
      <div className="copy_btn absolute bottom-2 right-2 " onClick={(e)=>{
            e.stopPropagation(); // ⛔ prevent modal from opening

        handleCopy()}}
      >
        <Image
          src={
            copy === "" ? "/assets/icons/copy.svg" : "/assets/icons/tick.svg"
          }
          width={20}
          height={20}
          alt="copy_btn"
        />
      </div>
      <div
        className="edit_btn absolute top-2 right-8 "
        style={{ cursor: "pointer" }}
        onClick={() => {
          seteditModal(true);
        }}
      >
        {edit && (
          <Image
            src={"/assets/icons/edit-image.png"}
            width={20}
            height={20}
            alt="edit"
          />
        )}
      </div>
      <div
        className="delete_btn absolute top-2 right-2 "
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleDelete(post);
        }}
      >
        {edit && (
          <Image
            src={"/assets/icons/icons8-trash-24.png"}
            width={20}
            height={20}
            alt="trash"
          />
        )}
      </div>
      {/* EDIT MODAL */}
      {editModal && (
        <Dialog
          open={editModal}
          onClose={seteditModal}
          className="relative z-10"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          {/* Center the modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full sm:w-[500px] max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all p-6"
            >
              
              {/* Modal Content */}
              <div className="bg-white">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  Edit your Prompt
                </DialogTitle>

                {/* Textarea */}
                <textarea
                  className="w-full p-2 mt-4 border rounded"
                  rows="10"
                  value={updatedPrompt}
                  onChange={(e) => setupdatedPrompt(e.target.value)}
                ></textarea>
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  Edit your Tag
                </DialogTitle>

                <textarea
                  className="w-full p-2 mt-4 border rounded"
                  rows="1"
                  value={updatedTag}
                  onChange={(e) => setupdatedTag(e.target.value)}
                ></textarea>
              </div>

              <div
                className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                onClick={() => seteditModal(false)}
              >
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
      {/* {SHOW MODAL} */}
      {!edit && showModal && (
        <Dialog
          open={showModal}
          onClose={setshowModal}
          className="relative z-10"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          {/* Center the modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full sm:w-[500px] max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all p-6"
            >
              {/* User INFO */}
              <div>
                <Image
                  src={Post.creator.image}
                  alt="user_profile"
                  width={40}
                  height={40}
                />
              </div>

              <div className="text-lg font-semibold text-gray-900">
              <DialogTitle
              as="h3">
              {Post.creator.username}
              </DialogTitle>  
              </div>
              <h5 className="text-lg font-semibold text-sm text-gray-600">
                {Post.creator.email}
              </h5>
              {/* Modal Content */}
              <div className="bg-white">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  Prompt
                </DialogTitle>

                {/* Textarea */}
                <textarea
                  className="w-full p-2 mt-4 border rounded"
                  rows="10"
                  defaultValue={post.prompt}
                  disabled
                ></textarea>
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  Tag
                </DialogTitle>

                <textarea
                  className="mt-3 inline-block rounded-md bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-600 "
                  rows="1"
                  defaultValue={`#${post.tag}`}
                ></textarea>
              </div>

              <div
                className="copy_btn absolute bottom-7 right-2 "
                onClick={handleCopy}
              >
                <Image
                  src={
                    copy === ""
                      ? "/assets/icons/copy.svg"
                      : "/assets/icons/tick.svg"
                  }
                  width={22}
                  height={22}
                  alt="copy_btn"
                />
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default PromptCard;
