const express = require('express');
const {addProductController,getAllProductController,updateProductController} = require('../controllers/product.controller');

const router = express.Router();

router.post('/',addProductController);

router.get('/',getAllProductController);

router.put('/:id',updateProductController);


module.exports = router;

