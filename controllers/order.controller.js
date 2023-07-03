const {addOrderService,updateOrderService,getAllOrderService,getTotalPriceService} = require('./../services/order.service')

async function addOrderContoller(req, res){
    const {uid,products,shippingAddId,payment} =  req.body;

    const orderData = {
        user:uid,
        products,
        shippingAdd:shippingAddId,
        payment
    }

    const {totalPrice} = await getTotalPriceService(products)
    console.log(totalPrice)

    // orderData.totalPrice = totalPrice;
    orderData.totalPrice = 599 
    
    
    let orderServiceData = await addOrderService(orderData)

    if(orderServiceData.success){
        res.status(200).send({
            message: orderServiceData.message,
            data: orderServiceData.data
        });
    }else{
        res.status(500).send({
            message: orderServiceData.message,
            data:orderServiceData.data
        });
    }
}

async function getAllOrderController(req,res){

    const orderData = await getAllOrderService();

    if(orderData.success){
        res.status(200).send({
            message:orderData.message,
            data:orderData.data
        })
    }else{
        res.status(500).send({
            message:orderData.message
        })
    }

}

async function updateOrderController(req,res){

    const id = req.params.id;

    const updatedOrderData = req.body;

    const orderServiceData = await updateOrderService(id,updatedOrderData)

    if(orderServiceData.success){
        res.status(200).send({
            message:orderServiceData.message,
            data:orderServiceData.data
        })
    }else{
        res.status(500).send({
            message:orderServiceData.message
        })
    }

}

module.exports = {
    addOrderContoller,
    getAllOrderController,
    updateOrderController
}