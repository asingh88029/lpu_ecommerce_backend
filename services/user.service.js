const UserModel = require("../models/user.model");

async function addUserService(userData){
    const user = await UserModel.create(userData);
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

async function getOneUserService(id){
    const user = await UserModel.findById(id);
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
    const users = await UserModel.find();
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
    const user = await UserModel.findByIdAndUpdate(id,updatedUser,{new:true});
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
    getOneUserService,
    getAllUserService,
    updateUserService,
}