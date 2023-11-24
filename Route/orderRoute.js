import express from 'express';
import { createOrder, deleteOrder, getAllOrders, myOrders, orderDetails, updateOrders } from '../controller/orderController.js';
import { checkUser } from '../middlewares/auth.js';
import { authenticateUser } from '../utils/checkUser.js';
export const orderRouter=express.Router();
orderRouter.post('/create',authenticateUser,createOrder)
orderRouter.get('/myOrders',authenticateUser,myOrders)
orderRouter.get('/orderDetails/:id',authenticateUser,orderDetails)
orderRouter.get('/allOrders',getAllOrders)
orderRouter.post('/updateOrder/:id',updateOrders)
orderRouter.delete('/deleteOrder/:id',deleteOrder)