const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const cartRouter = require('./routes/cart.route');
const addressRouter = require('./routes/shippingAdd.route');
const orderRouter = require('./routes/order.route');

const app = express();

app.use(express.json());

// globally
app.use(cors())

const mongoURI = "mongodb://asingh88029:e9vfnVfFicgUdGVf@ac-clksbmc-shard-00-00.lzqwx73.mongodb.net:27017,ac-clksbmc-shard-00-01.lzqwx73.mongodb.net:27017,ac-clksbmc-shard-00-02.lzqwx73.mongodb.net:27017/?ssl=true&replicaSet=atlas-gh4fgn-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("MongoDB Connected")
}).catch((err)=>{
    console.error("Failed to connect with MongoDB",err)
    process.exit(1);
})

app.use("/product",productRouter);

app.use('/user',userRouter);

app.use('/cart',cartRouter);

app.use('/shippingAdd',addressRouter);

app.use('/order',orderRouter);

app.use((req,res)=>{
    res.status(404).send({
        message:"API endpoint not found."
    })
})

app.listen(9000,()=>{
    console.log("Your Server is started on port 9000")
})