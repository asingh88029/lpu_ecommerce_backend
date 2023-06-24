const Cart = require("../models/cart.model");

async function addCartService(cartData){
    const cart = await Cart.create(cartData);
    if(cart){
        return {
            success:true,
            message:"Cart is Added",
            data:cart
        }
    }else{
        return {
            success:false,
            message:"Cart is not Added"
        }
    }
}

async function getAllCartService(){
    const carts = await Cart.find();
    if(carts){
        return {
            success:true,
            message:"Carts are sent",
            data:carts
        }
    }else{
        return {
            success:false,
            message:"Carts are not available"
        }
    }
}

async function updateCartService(cid,updatedCart){
    const cart = await Cart.findByIdAndUpdate(cid,updatedCart,{new:true});
    if(cart){
        return {
            success:true,
            message:"Cart is updated",
            data:cart
        }
    }else{
        return {
            success:false,
            message:"Cart is not updated"
        }
    }
}

module.exports = {
    addCartService,
    getAllCartService,
    updateCartService
}