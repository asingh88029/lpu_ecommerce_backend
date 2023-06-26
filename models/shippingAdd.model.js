const mongoose = require('mongoose');

const shippingAddSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    streetAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    altMobile:{
        type:Number
    }
})

const Address = mongoose.model('Address',shippingAddSchema);

module.exports = Address;