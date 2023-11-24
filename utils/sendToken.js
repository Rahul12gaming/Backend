export const sendToken=(user,statusCode,res)=>
{
    const token=user.getToken();
     
    res.status(statusCode).cookie("token",token,{
        expires:new Date(Date.now()+5*24*60*60*1000),
        httpOnly:true
    }).json({
        success:true,
        user,
        token,
    })
}