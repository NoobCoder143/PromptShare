"use client";
import Feed from "@components/Feed";
import { useSession } from "next-auth/react";
const Homepage = () => {
  const { data: session } = useSession();
  return !session?.user ?(
  <div className=" h-screen flex items-center justify-center">
    <div className="max-w-7xl w-full px-6 sm:px-10 lg:px-16">
      <div className="relative isolate overflow-hidden bg-white px-6 py-16 shadow-2xl text-center lg:text-left lg:flex lg:items-center lg:justify-center lg:gap-x-20 lg:px-24">
        <div className="w-full">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl py-10">
            <span className="orange_gradient">PromptShare</span>
          </h1>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Boost your productivity. Start using our app today.
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            PromptShare is an open-source AI prompting project where you can
            discover and share various useful AI prompts.
          </p>
          
        </div>
      </div>
    </div>
  </div>):
  (  <div >
    <section className="w-full flex center flex-col ">
     <h1 className="text-4xl font-bold tracking-tight text-pretty text-gray-900 sm:text-5xl text-center py-10">
       <span className="orange_gradient">
        PromptShare
       </span>
      <br/>
      DISCOVER AND SHARE
      <br/>
      <span className="orange_gradient text-center" >
        AI-POWERED
         PROMPTS
      </span>
     </h1>
     {!session?.user?<h3 className="text-center text-orange-600 font-bold">Sigin to share your prompts</h3>:""}
     <p className="text-center">PromptShare  is a open source Al prompting project where you can discover and share various useful AI prompts</p>
      <Feed/>
      
     
    </section>
    </div>)
}
  
  ;
;

export default Homepage;
