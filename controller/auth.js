import mongoose from "mongoose";
import User from "../model/userModel.js";
import { sendCongratsEmail, sendEmail } from "../utils/sendMail.js";
import crypto from 'crypto';
import { sendToken } from "../utils/sendToken.js";
import { log } from "console";



export const Singup = async (req, res) => {

    try {

        const { name, email, gender, password } = req.body;
        let exist = await User.findOne({ email: email });
        if (exist) {
            return res.status(401).json({
                msg: "User already Exist",
                user: exist
            })
        }


        let user = await User.create(req.body)
        const token = user.getToken();
        console.log(token);

        console.log(user);
        await sendCongratsEmail(email, name)
        sendToken(user, 200, res);


    }
    catch (err) {
        console.log("singup");
        return res.status(404).json({
            error: err.message
        })
    }
}
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                msg: "User Not Exist",

            })
        }
        const matchedPassword = await user.comparePassword(password);

        if (!matchedPassword) {
            return res.status(404).json({
                msg: "Password Is Incorrect",

            })

        }
        const token = user.getToken();

        sendToken(user, 200, res);
    }
    catch (err) {
        console.log(err.message);
        return res.status(404).json({
            error: err.message
        })
    }
}
export const Logout = (req, res) => {
    try
    {
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        return res.status(200).json({
            success:true,
            msg:"User Logout!" 

        })
    }
    catch(err)
    {
        return res.status(404).json({
            error: err.message
        })
    }
}


export const ForgetPassword = async (req, res) => {
    try {

        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User does not exist",
            })
        }
        const resetToken = await user.getResetToken();

        const resetUrl = `https:${req.get("host")}/auth/resetPassword/${resetToken}`
        await sendEmail(user.email, resetUrl)
        await user.save();
        return res.status(200).json({
            success: true,
            msg: `Email Sended to ${user.email}`
        })


    }
    catch (err) {
        console.log(err.message);
    }
}



export const ResetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const resetPasswordToken = req.params.token;
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(404).json({
                msg: "User Not Found"
            });
        }
        user.password = password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save();
        return res.status(200).json({
            success: true,
            user
        })
    }
    catch (err) {
        console.log(err.message);
    }
}

// Admin User Controller

export const gettAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return
        }
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (err) {
        console.log(err.message);
    }
}
export const getSingleUserData = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                msg: "User does Not Exist's"
            })
        }
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (err) {
        console.log(err.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        const user2=await User.find({_id:req.user._id})
        if(user===user2)
        {
            return res.status(400).json({
                success:false,
                error:"can not delete LoggedIn user"
            })
        }
        if (!user) {
            return res.status(400).json({
                msg: "User does Not Exist's"
            })
        }
        return res.status(200).json({
            success: true
        })
    }
    catch (err) {
        console.log(err.message);
    }

}
export const getUserDetails = async (req, res) => {

    const user = await User.findById(req.user.id);
    return res.status(200).json({
        success: true,
        user
    })

}
export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "User Does Not Exist"
            })
        }
        else if(user.role==="admin")
        {
            return res.status(400).json({
                success: false,
                error: "Already a Admin!"
            })
        }
        user.role = "admin";
        await user.save({ validateBeforeSave: false })
        return res.status(200).json({
            success: true,
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}