const express = require('express');
const {addProductController,getOneProductController,getAllProductController,updateProductController} = require('../controllers/product.controller');

const router = express.Router();

router.post('/',addProductController);

router.get('/all',getAllProductController);

router.get('/:id',getOneProductController);

router.put('/:id',updateProductController);


module.exports = router;

