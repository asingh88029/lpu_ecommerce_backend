const {addProductService,getAllProductService,updateProductService} = require("../services/product.service");



async function addProductController(req,res){
    const newProduct = req.body;

    const serviceData = await addProductService(newProduct);

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

async function getAllProductController(req,res){

    const serviceData = await getAllProductService();

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

async function updateProductController(req,res){

    const id = req.params.id;

    const updatedProductData = req.body;

    const serviceData = await updateProductService(id,updatedProductData)

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
    addProductController,
    getAllProductController,
    updateProductController
};
