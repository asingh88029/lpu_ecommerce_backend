const {addAddressService,getAllAddressService,updateAddressService} = require("../services/shippingAdd.service");



async function addAddressController(req,res){

    const {user,streetAddress,city,state,country,pincode,mobile,altMobile} = req.body;

    const newAddress = {
        user,
        streetAddress,
        city,state,country,pincode,mobile,altMobile
    }

    const addressData = await addAddressService(newAddress);

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

    const id = req.params.id;

    const updatedAddressData = req.body;

    const addressData = await updateAddressService(id,updatedAddressData)

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
