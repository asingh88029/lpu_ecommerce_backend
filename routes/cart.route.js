const express = require('express');
const Authorization = require('./../middlewares/Authorization');
const {addCartController,updateCartController,getAllCartController} = require('../controllers/cart.controller');

const router = express.Router();

router.post('/:id',Authorization(['customer']),addCartController);

router.get('/',Authorization(['admin']),getAllCartController);

router.get('/:id',Authorization(['customer']),getAllCartController);

router.put('/:id',Authorization(['customer']),updateCartController);


module.exports = router;

