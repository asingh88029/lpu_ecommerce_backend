const Order = require("../models/order.model");
const Product = require('./../models/product.model');

async function addOrderService(orderData){
    const order = await Order.create(orderData);
    if(order){
        return {
            success:true,
            message:"Order is Added",
            data:order
        }
    }else{
        return {
            success:false,
            message:"Order is not Added"
        }
    }
}

async function getAllOrderService(){
    const order = await Order.find().populate('user','email name').populate('shippingAdd','streetAddress city state country pincode mobile altMobile');
    if(order.length){
        return {
            success:true,
            message:"Orders are sent",
            data:order
        }
    }else{
        return {
            success:false,
            message:"Orders are not available"
        }
    }
}

async function updateOrderService(oid,updatedOrder){
    const order = await Order.findByIdAndUpdate(oid,updatedOrder,{new:true});
    if(order){
        return {
            success:true,
            message:"Order is updated",
            data:order
        }
    }else{
        return {
            success:false,
            message:"Order is not updated"
        }
    }
}

async function getTotalPriceService(products){

    const totalPrice = await products.reduce(async (totalPrice,currentElem)=>{
        const productDetails=await Product.findById(currentElem.product)
        return totalPrice + currentElem.qty * productDetails.price
    },0)

    console.log(totalPrice,"Service Msg")

    if(totalPrice){
        return {
            success:true,
            message:"Total Price",
            totalPrice:totalPrice
        }
    }else{
        return {
            success:false,
            message:"Total Price",
            totalPrice:totalPrice
        }
    }
}

module.exports = {
    addOrderService,
    getAllOrderService,
    updateOrderService,
    getTotalPriceService
}