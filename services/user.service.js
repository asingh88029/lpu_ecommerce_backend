const User = require("../models/user.model");

async function addUserService(userData){
    const user = await User.create(userData);
    if(user){
        return {
            success:true,
            message:"User Registered",
            data:user
        }
    }else{
        return {
            success:false,
            message:"User is not Registered"
        }
    }
}

async function findUserByEmailService(email){
    const user = await User.findOne({email});
    if(user){
        return {
            success:true,
            message:"User Found",
            data:user
        }
    }else{
        return {
            success:false,
            message:"User not found"
        }
    }
}

async function forgotPasswordService(email,otp,otpExpireTime){

    const user = await User.findOne({email});

    console.log(user)

    const updatedUserData = {
        otp,
        otpExpireTime
    }

    const newUser = await User.findByIdAndUpdate(user._id,updatedUserData,{new:true})

    if(newUser){
        return {
            success:true,
            message:"OTP Added in database."
        }
    }
}

async function resetPasswordService(email,otp,password){

    const user = await User.findOne({
        email,
        otp
    });

    if(user){
        const expiryCheck = Date.now()<new Date(user.otpExpireTime).getTime();
        if(!expiryCheck){
            return {
                success:false,
                message:"OTP Expired"
            } 
        }
    }else{
        return {
            success:false,
            message:"OTP Invalid"
        }
    }

    const updatedUserData = {
        password:password,
        otp:null,
        otpExpireTime:null
    }

    const newUser = await User.findByIdAndUpdate(user._id,updatedUserData,{new:true})

    if(newUser){
        return {
            success:true,
            message:"Password Updated Successfully."
        }
    }
}

async function getOneUserService(id){
    const user = await User.findById(id);
    if(user){
        return {
            success:true,
            message:"User are sent",
            data:user
        }
    }else{
        return {
            success:false,
            message:"User are not available"
        }
    }
}


async function getAllUserService(){
    const users = await User.find();
    if(users){
        return {
            success:true,
            message:"Users are sent",
            data:users
        }
    }else{
        return {
            success:false,
            message:"Users are not available"
        }
    }
}

async function updateUserService(id,updatedUser){
    const user = await User.findByIdAndUpdate(id,updatedUser,{new:true});
    if(user){
        return {
            success:true,
            message:"User is updated",
            data:user
        }
    }else{
        return {
            success:false,
            message:"User is not updated"
        }
    }
}

module.exports = {
    addUserService,
    findUserByEmailService,
    forgotPasswordService,
    resetPasswordService,
    getOneUserService,
    getAllUserService,
    updateUserService,
}