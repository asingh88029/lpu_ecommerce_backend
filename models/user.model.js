const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:String,
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    },
    otp:{
        type:Number
    },
    otpExpireTime:{
        type:Date
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;