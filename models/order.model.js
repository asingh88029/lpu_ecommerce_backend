const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        qty:Number
    }],
    totalPrice:{
        type:Number
    },
    shippingAdd:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },
    payment:{
        status:String,
        mode:String,
        paymentID:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;