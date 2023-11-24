import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const checkUser = async (req, res, next) => {
    try
    {
        const {token}=req.cookies;
        if(!token)
        {
            return Error("Invalid User");
        }
        const decode=jwt.verify(token,"hellobhailog");
        req.user=await User.findById(decode.id);
        next();
    }
    catch(err)
    {
        console.log(err.message);
    }
}