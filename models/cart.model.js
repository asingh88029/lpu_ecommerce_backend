const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    pid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    qty:Number
})

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;