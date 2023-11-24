import nodemailer from 'nodemailer';
const transporter=nodemailer.createTransport({
    service:'gmail',
    
    auth:{
        user:"codingpathshala837@gmail.com",
        pass:"shwc ywez lzek zcpy",
    },
}); 

export const sendEmail=(email,link)=>
{
    transporter.sendMail({
        from:'codingpathshala837@gmail.com',
        to:`${email}`,
        subject:"Forget Password Link",
        html:`<a href=${link}>forget password</a>`
    },function(err,data){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
        }
    })
}

export const sendCongratsEmail=(email,name)=>
{
    transporter.sendMail({
        from:'codingpathshala837@gmail.com',
        to:`${email}`,
        subject:"Welcome To MERN Store",
        text:"Singup Successful",
        html:`<p>Thanks ${name} For Visiting Our Company Website.</p><br/><p>Continue Your Shopping</p>`
    },function(err,data){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
        }
    })
}