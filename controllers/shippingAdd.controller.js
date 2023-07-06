const httpStatus = require("http-status");
const {addAddressService,getAllAddressService,findAddressByuserIdandAidService,updateAddressService} = require("../services/shippingAdd.service");



async function addAddressController(req,res){

    const {user,streetAddress,city,state,country,pincode,mobile,altMobile} = req.body;

    if(req.userId!=user){
        return res.status(httpStatus.UNAUTHORIZED).send({
            message:"You can't add someone else address."
        })
    }

    const newAddress = {
        user,
        streetAddress,
        city,state,country,pincode,mobile,altMobile
    }

    const addressData = await addAddressService(newAddress);

    if(addressData.success){
        return res.status(200).send({
            message:addressData.message,
            data:addressData.data
        })
    }else{
        return res.status(500).send({
            message:addressData.message
        })
    }

}

async function getAllAddressController(req,res){

    const addressData = await getAllAddressService();

    if(addressData.success){
        res.status(200).send({
            message:addressData.message,
            data:addressData.data
        })
    }else{
        res.status(500).send({
            message:addressData.message
        })
    }

}

async function updateAddressController(req,res){

    const aId = req.params.id;

    const serviceData = await findAddressByuserIdandAidService(req.userId,aId)

    if(!serviceData.success){
        return res.status(httpStatus.UNAUTHORIZED).send({
            message:"You can't update someone else address."
        })
    }

    const updatedAddressData = req.body;

    const addressData = await updateAddressService(aId,updatedAddressData)

    if(addressData.success){
        res.status(200).send({
            message:addressData.message,
            data:addressData.data
        })
    }else{
        res.status(500).send({
            message:addressData.message
        })
    }

}

module.exports = {
    getAllAddressController,
    addAddressController,
    updateAddressController
};
