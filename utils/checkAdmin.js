import User from "../model/userModel"

export const checkAdmin=async(req,res,next)=>{
    try
    {
        const user=await User.findById({_id:req.user._id});
        if(user.role!=="admin")
        {
            return res.status(200).json({
                success:false,
                error:"Invalid Admin"
            })
        }
        next();
    }
    catch(err)
    {
        return res.status(200).json({
            success:false,
            error:err.message
        })
    }
}