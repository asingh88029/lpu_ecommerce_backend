const Address = require("../models/shippingAdd.model");

async function addAddressService(addressData){
    const address = await Address.create(addressData);
    if(address){
        return {
            success:true,
            message:"Address is Added",
            data:address
        }
    }else{
        return {
            success:false,
            message:"Address is not Added"
        }
    }
}

async function getAllAddressService(){
    const address = await Address.find().populate('user','name email mobile');
    if(address.length){
        return {
            success:true,
            message:"Addresses are sent",
            data:address
        }
    }else{
        return {
            success:false,
            message:"Addresses are not available"
        }
    }
}

async function updateAddressService(aid,updatedAddress){
    const address = await Address.findByIdAndUpdate(aid,updatedAddress,{new:true});
    if(address){
        return {
            success:true,
            message:"Address is updated",
            data:address
        }
    }else{
        return {
            success:false,
            message:"Address is not updated"
        }
    }
}

async function findAddressByuserIdandAidService(uid,aid){
    const address = await Address.findOne({user:uid,_id:aid});
    if(address){
        return {
            success:true,
            message:"Address is found",
            data:address
        }
    }else{
        return {
            success:false,
            message:"Address is not found"
        }
    }
}

module.exports = {
    addAddressService,
    getAllAddressService,
    findAddressByuserIdandAidService,
    updateAddressService
}