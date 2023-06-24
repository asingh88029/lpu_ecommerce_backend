const express = require('express');
const {addCartController,updateCartController,getAllCartController} = require('../controllers/cart.controller');

const router = express.Router();

router.post('/',addCartController);

router.get('/',getAllCartController);

router.put('/:id',updateCartController);


module.exports = router;

