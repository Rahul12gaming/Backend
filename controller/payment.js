import Stripe from "stripe";

const API_KEY="pk_test_51O7szTSA6baolQF6sUlMKMqw3pQItcnIEVZMFLU9OkxsYi2KOpUgpx8zK8Fk2hLotxTtNXzOsbYX9kD62WqWY7VJ00XjTELYWv";
const screst_key="sk_test_51O7szTSA6baolQF6fqEPadQZZkWA0Qt2A1LdYFTADJ2nJxUnH9PLeYQ8KkBsnBgzDZbiMmbMkZ4SZAE0noY6dYHZ009mCmxFsf";
const stripe=new Stripe(screst_key)
export const sendStripeApiKey=(req,res)=>{
    res.status(200).json({
        stripeApiKey:API_KEY
    })
}

export const processPayment=async(req,res)=>{
try{
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "Ecommerce",
        },
      });
      res.status(200).json({
        success:true,
        client_secret: myPayment.client_secret
      })
}
catch(err)
{
    console.log(err.message);
}
}