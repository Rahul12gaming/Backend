import mongoose from "mongoose";
import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getAllProduct2, getProductDetails } from "../controller/product.js";
export const productRouter=express.Router();

productRouter.post('/create',createProduct);
productRouter.get('/admin/products',getAllProduct);
productRouter.get('/details/:id',getProductDetails);
productRouter.get('/product',getAllProduct2 )
productRouter.delete('/delete/:id',deleteProduct); 

