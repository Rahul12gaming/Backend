
import express from 'express';
import cors from 'cors'
import { authRouter } from './Route/authRoute.js';
import { connectDatabase } from './config/database.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary'
import { productRouter } from './Route/productROute.js';
import bodyParser from 'body-parser';
import { paymentRouter } from './Route/paymentRoute.js';
import { orderRouter } from './Route/orderRoute.js';
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"https://codeswear-frontend-q3d05ah5x-rahul12gaming.vercel.app",credentials:true}))



connectDatabase();
// cloudinary.config({
//     cloud_name:"dpnopbk54",
//     api_key:"719839288282721",
//     api_secret:"kTnB4QIG1QHHQZeTPLQ2n6otENc"
// })

app.use("/auth",authRouter);
app.use("/product",productRouter);
app.use("/stripe",paymentRouter);
app.use("/order",orderRouter)
app.listen(4000,()=>
{
    console.log("server is Started");
});


// app.get("/",(req,res)=>
// {
//     // res.send("<h1>hello</h1>")
//     res.sendFile("C:/Users/Rahul Adhikari/Desktop/backend/views/index.html");
// })
// app.get("/about",(req,res)=>
// {
//     // res.send("<h1>About</h1>")
//     res.sendFile("/about.html",{root:'./views'})
// })
// // Middlewares
// app.use((req,res)=>{
//     res.statusCode=404;
//     // res.json({msg:"Page Not Found!"})
//     res.send("Page Not Found!")
// })
