const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    rating:Number,
    imagesURL:[{
        type:String
    }],
    description:{
        type:String
    }
})

const Product = mongoose.model('Product',productSchema);
// products - Collection Name
/*
1. It converts the model name provide to mongoose.model('Product') in lower case - product
2. It make plurals - products
Now products will be our collection name. 
*/

module.exports = Product;