import mongoose from "mongoose";
export const connectDatabase=()=>
{
    
    mongoose.connect('mongodb+srv://codingpathshala837:iVuUV9sph7m3Ozix@cluster0.cdwy3p3.mongodb.net/')
    .then(()=>{
        console.log("Database Connected");
    })
    .catch((err)=>{
        console.log(err.message);
    })
}
