const httpStatus = require("http-status");
const {addCartService,getAllCartService,updateCartService} = require("../services/cart.service");



async function addCartController(req,res){

    const {pid,qty} = req.body;
    const uid = req.params.id;

    if(uid && pid && qty){

        if(req.userId != uid){
            return res.status(httpStatus.UNAUTHORIZED).send({
                message:"You are not allowed to add someone's else cart."
            })
        }
        

        const newCart = {
            uid,
            pid,
            qty
        }

        const serviceData = await addCartService(newCart);

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
    }else{
        return res.status(httpStatus.BAD_REQUEST).send({
            message:"UserId or ProductId Qty Is Missing"
        })
    }

}

async function getAllCartController(req,res){

    const serviceData = await getAllCartService();

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

async function getUserCartController(req,res){

    const uid = req.params.id;

    if(uid!=req.userId){
        return res.status(httpStatus.UNAUTHORIZED).send({
            message:"You are not allowed to see someone's cart details."
        })
    }



}

async function updateCartController(req,res){

    const id = req.params.id;

    const updatedCartData = req.body;

    const serviceData = await updateCartService(id,updatedCartData)

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
    getAllCartController,
    addCartController,
    updateCartController
};
