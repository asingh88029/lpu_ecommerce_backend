const express = require('express');
const Authorization = require('./../middlewares/Authorization');
const {addAddressController,updateAddressController,getAllAddressController} = require('../controllers/shippingAdd.controller');

const router = express.Router();

router.post('/',Authorization(['customer']),addAddressController);

router.get('/',Authorization(['admin']),getAllAddressController);

router.put('/:id',Authorization(['customer']),updateAddressController);


module.exports = router;

