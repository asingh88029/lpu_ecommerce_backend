const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    pid:{
        type:String,
        unique:true,
        require:true
    },
    name:String,
    price:Number,
    rating:Number
})

const ProductModel = mongoose.model('products',productSchema);

module.exports = ProductModel;