const express = require('express');
const {addUserController,getOneUserController,getAllUserController,updateUserController} = require('../controllers/user.controller');

const router = express.Router();


/*
/user/
*/
router.post('/',addUserController);

/*
/user/all
*/
router.get('/all',getAllUserController);

/*
/user/6494659bee473020415c02e0
*/
router.get('/:id',getOneUserController);


/*
/user/6494659bee473020415c02e0
*/
router.put('/:id',updateUserController);


module.exports = router;