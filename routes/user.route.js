const express = require('express');
const {addUserController,getOneUserController,getAllUserController,updateUserController} = require('../controllers/user.controller');

const router = express.Router();

router.post('/',addUserController);

router.get('/:id',getOneUserController);

router.get('/all',getAllUserController);

router.put('/:id',updateUserController);


module.exports = router;