const {addUserService,getOneUserService,getAllUserService,updateUserService} = require("../services/user.service");



async function addUserController(req,res){
    const newUser = req.body;

    const serviceData = await addUserService(newUser);

    if(serviceData.success){
        res.status(200).send({
            message:serviceData.message,
            data:serviceData.data
        })
    }else{
        res.status(500).send({
            message:serviceData.message
        })
    }

}

async function getOneUserController(req,res){

    const id = req.params.id;

    const serviceData = await getOneUserService(id);

    if(serviceData.success){
        res.status(200).send({
            message:serviceData.message,
            data:serviceData.data
        })
    }else{
        res.status(500).send({
            message:serviceData.message
        })
    }

}

async function getAllUserController(req,res){


    const serviceData = await getAllUserService();

    if(serviceData.success){
        res.status(200).send({
            message:serviceData.message,
            data:serviceData.data
        })
    }else{
        res.status(500).send({
            message:serviceData.message
        })
    }

}

async function updateUserController(req,res){

    const id = req.params.id;

    const updatedUserData = req.body;

    const serviceData = await updateUserService(id,updatedUserData)

    if(serviceData.success){
        res.status(200).send({
            message:serviceData.message,
            data:serviceData.data
        })
    }else{
        res.status(500).send({
            message:serviceData.message
        })
    }

}

module.exports = {
    addUserController,
    getOneUserController,
    getAllUserController,
    updateUserController
};
