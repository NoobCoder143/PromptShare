import mongoose from 'mongoose'

let isConnected= false;

export const connectedToDB= async()=>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    }
    try {
        mongoose.connect(process.env.MONGODB_URI,{
            dbname:"share_prompts",
           
        })
        isConnected-true;
    } catch (error) {
        console.log(error);
    }

}