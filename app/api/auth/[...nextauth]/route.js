import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectedToDB } from "@utils/database";
import User from "@models/user";
const handler= NextAuth({
    providers:[
        GoogleProvider(
            {
                clientId:process.env.GOOGLE_ID,
                clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            }
        )
    ],
    callbacks:{
    async session({session}){
      const sessionUser= await User.findOne({
        email:session.user.email
      })
      //updating user with the current user id
      session.id=sessionUser._id;
      return session;
    },
    async signIn({profile}){
         await connectedToDB();
         //check if the user already exists
         const userExists= await User.findOne({email:profile.email});
         //creating new user if it doe not exits
         if(!userExists){
           await User.create({
                email:profile.email,
                username:profile.name.replace(" ","").toLowerCase(),
                image:profile.picture
            })
         }
return true;
    } }
})
export {handler as GET,handler as POST}