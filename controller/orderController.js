import { Order } from "../model/orderModel.js";

export const createOrder=async(req,res)=>{
    try
    {
        console.log("order");
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          } = req.body;
        
          const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
          });
        console.log(order);
          res.status(201).json({
            success: true,
            order,
          });
    }
    catch(err)
    {
        console.log(err.message);
    }
}
export const myOrders=async(req,res)=>{
  try{
    const order=await Order.find({user:req.user._id});
    res.status(200).json({
      success:true,
      order
    })

  }
  catch(err)
  {
    res.status(400).json({
      success:false,
      error:err.message
    })
  }
}
export const orderDetails=async(req,res)=>{
  try
  {
      const order=await Order.findById(req.params.id).populate("user", "name email")
      if(!order)
      {
        return  res.status(400).json({
          success:false,
          error:"Order Does Not Exist"
        })
      }
      res.status(200).json({
        success:true,
        order
      })
  }
  catch(err)
  {
    console.log(err.message);
  }
}
export const getAllOrders=async(req,res)=>{

  try
  {
      const order=await Order.find();
      if(!order)
      {
        console.log("Oder Not Pressent");
      }
      return res.status(200).json({
        success:true,
        order
      })
  }
  catch(err)
  {
      console.log(err.message);
  }
}
export const updateOrders=async(req,res)=>{

  try
  {
      const order=await Order.findById(req.params.id);
      if(!order)
      {
        console.log("Oder Not Pressent");
      }
      if(order.orderStatus==="Delivered")
      {
        return res.status(400).json({
          success:false,
          error:"Already Delivered"
        })
      }
      order.orderStatus=req.body.status;
      if(req.body.status==="Delivered")
      {
        order.deliveredAt=Date.now();
      }
      await order.save({validateBeforeSave:false});
      return res.status(200).json({
        success:true,
      })
  }
  catch(err)
  {
      console.log(err.message);
  }
}
export const deleteOrder=async(req,res)=>
{
  try
  {
      const order = await Order.findByIdAndDelete(req.params.id);
      if(!order)
      {
        return res.status(404).json({
          success:false,
          error:"Order Not exist"
        })
      }
     
      return res.status(200).json({
        success:true
      })
  }
  catch(err)
  {

  }
}