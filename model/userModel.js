import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
 const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        select:false
    },
    password:{
        type:String,
        required:true,
        minLength:8,
    
    },
    role:{
        type:String,
        default:"user"
    },
    
    createdAt:{
        type:Date,
       default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
   
});
userSchema.methods.comparePassword=async function(check){
    return await bcrypt.compare(check,this.password)

}
userSchema.methods.getResetToken=async function()
{
    const resetToken=crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}
userSchema.methods.getToken= function()
{
    return  jwt.sign({id:this._id},"hellobhailog");
}
userSchema.pre("save",async function(){
    const salt=await bcrypt.genSalt();
    const hashePassword=await bcrypt.hash(this.password,salt);
    this.password=hashePassword;
    console.log(hashePassword);
})
const User=mongoose.model("User",userSchema);
export default User;