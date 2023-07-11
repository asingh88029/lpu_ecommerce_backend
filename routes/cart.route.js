const express = require('express');
const Authorization = require('./../middlewares/Authorization');
const {addCartController,getUserCartController,updateCartController,getAllCartController} = require('../controllers/cart.controller');

const router = express.Router();

router.post('/:id',Authorization(['customer']),addCartController);

router.get('/all',Authorization(['admin']),getAllCartController);

router.get('/:id',Authorization(['customer']),getUserCartController);

router.put('/:id',Authorization(['customer']),updateCartController);


module.exports = router;

