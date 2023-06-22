const ProductModel = require("../models/product.model");

async function addProductService(productData){
    const product = await ProductModel.create(productData);
    if(product){
        return {
            success:true,
            message:"Product Added",
            data:product
        }
    }else{
        return {
            success:false,
            message:"Product is not Added"
        }
    }
}

async function getAllProductService(){
    const products = await ProductModel.find();
    if(products){
        return {
            success:true,
            message:"Products are sent",
            data:products
        }
    }else{
        return {
            success:false,
            message:"Product are not available"
        }
    }
}

async function updateProductService(id,updatedProduct){
    console.log(id,updatedProduct)
    const product = await ProductModel.findByIdAndUpdate(id,updatedProduct,{new:true});
    console.log(product)
    if(product){
        return {
            success:true,
            message:"Product is updated",
            data:product
        }
    }else{
        return {
            success:false,
            message:"Product is not updated"
        }
    }
}

module.exports = {
    addProductService,
    getAllProductService,
    updateProductService
}