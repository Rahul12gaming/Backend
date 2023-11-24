import mongoose from 'mongoose'
import { Schema } from 'mongoose';
const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },

    description: { type: String, required: true },

    price: { type: Number, min: [1, 'wrong min price'] }, 

    

    rating: { type: Number, min: [0, 'wrong min rating'], max: [5, 'wrong max price'], default: 0 },

    stock: { type: Number, min: [0, 'wrong min stock'], default: 1 },

    brand: { type: String, required: true },

    category: { type: String, required: true },


    images: { type: [String], required: true },

   


   
})
const Product=mongoose.model("Product",productSchema);
export default Product;