const express = require('express');
const Authorization = require('./../middlewares/Authorization');

const multer = require('multer');

const upload = multer({dest:'./../uploads/'});

const {addProductController,getOneProductController,getAllProductController,updateProductController} = require('../controllers/product.controller');

const router = express.Router();

router.post('/',Authorization('admin'),upload.array('images',5),addProductController);

router.get('/all',getAllProductController);

router.get('/:id',getOneProductController);

router.put('/:id',Authorization('admin'),updateProductController);


module.exports = router;

