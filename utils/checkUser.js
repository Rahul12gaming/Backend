import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
export const authenticateUser=async(req,res,next)=>
{
    
        console.log("middleware");
        const {token}=req.cookies;
        
        if(!token)
        {
            return ;
        }
        const decode=jwt.verify(token,"hellobhailog");
        console.log(decode);
        req.user=await User.findById(decode.id);
        next();
    

}