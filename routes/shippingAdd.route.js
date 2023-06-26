const express = require('express');
const {addAddressController,updateAddressController,getAllAddressController} = require('../controllers/shippingAdd.controller');

const router = express.Router();

router.post('/',addAddressController);

router.get('/',getAllAddressController);

router.put('/:id',updateAddressController);


module.exports = router;

