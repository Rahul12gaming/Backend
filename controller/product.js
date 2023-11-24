import Product from "../model/productModel.js";
import { ApiFeatures } from "../utils/apifeatures.js";

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        await product.save();
        return res.status(200).json({
            success: true,
            product
        })
    }
    catch (err) {
        console.log(err.message);
    }
}
export const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find();
        if (!product) {
            return res.status(400).json({
                msg: "Does Not have Any Products"
            })
        }
        return res.status(200).json({
            success: true,
            product
        })
    }
    catch (err) {
        console.log(err.message);
    }
}
export const getProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json({
            success: true,
            product
        })
    }
    catch (err) {
        console.log(err.message);
    }
}
export const deleteProduct=async(req,res)=>{
    try{

        const product=await Product.findByIdAndDelete(req.params.id);
        if(!product)
        {
            return res.status(400).json({
                msg:"Product Not Exist"
            })
        }
        //await product.remove()
        return res.status(200).json({
            success:true,
            msg:"Product Deleted"
        })
    }
    catch(err)
    {
        console.log(err.message);
    }
}

export const getAllProduct2 = async (req, res) => {
    try{

    
        const resultPerPage=6;
        const productCount=await Product.countDocuments();
        
        const apiFeature=new ApiFeatures(Product.find(),req.query)
        .search()
        .filter();
       
        let product=await apiFeature.query;

        let filteredProductCount=product.length;
        apiFeature.pagination(resultPerPage) ;

        product=await apiFeature.query.clone();

        res.status(200).json({
            success:true,
            product,
            productCount,
            resultPerPage,
            filteredProductCount
        })
        
    }
    catch(err)
    {

    }
    
}
// export const getAdminProducts = async (req, res) => {
//     try{

    
//        const product=await Product.find();

//         res.status(200).json({
//             success:true,
//             product,
           
//         })
        
//     }
//     catch(err)
//     {

//     }
    
// }


