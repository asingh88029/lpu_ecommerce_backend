const express = require('express');
const {addOrderContoller,getAllOrderController,updateOrderController} = require('../controllers/order.controller');

const router = express.Router();

router.post('/',addOrderContoller);

router.get('/',getAllOrderController);

router.put('/:id',updateOrderController);


module.exports = router;

