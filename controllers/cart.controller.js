const httpStatus = require("http-status");
const {addCartService,getAllCartService,getUserCartService,updateCartService} = require("../services/cart.service");



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

    if(uid){

        if(uid!=req.userId){
            return res.status(httpStatus.UNAUTHORIZED).send({
                message:"You are not allowed to see someone's cart details."
            })
        }

        const serviceData = await getUserCartService(uid);

        if(serviceData.success){
            return res.status(httpStatus.OK).send({
                message:serviceData.message,
                data:serviceData.data
            })
        }else{
            return res.status(httpStatus.BAD_REQUEST).send({
                message:serviceData.message
            })
        }


    }else{

        return res.status(httpStatus.BAD_REQUEST).send({
            message:"UserId is missing."
        })

    }

}

async function updateCartController(req,res){

    const uid = req.params.id;

    const {pid,qty} = req.body;

    if(uid && pid && qty){

        if(uid!=req.userId){
            res.status(httpStatus.UNAUTHORIZED).send(
                {
                    message:"You can't update someone else cart"
                })
        }

        const updatedData = {
            pid,
            qty
        }

        const serviceData = await updateCartService(uid,updatedData)

        if(serviceData.success){
            return res.status(httpStatus.OK).send({
                message:serviceData.message,
                data:serviceData.data
            })
        }else{
            return res.status(httpStatus.BAD_REQUEST).send({
                message:serviceData.message
            })
        }

    }else{
        res.status(httpStatus.UNAUTHORIZED).send({
            message:"UserId or ProductId or Qty is missing"
        })
    }

}

module.exports = {
    getAllCartController,
    getUserCartController,
    addCartController,
    updateCartController
};
