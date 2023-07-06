const express = require('express');
const {addUserController,forgotPasswordController,resetPasswordController,authenticationController,getOneUserController,getAllUserController,updateUserController} = require('../controllers/user.controller');
const Authorization = require('./../middlewares/Authorization')
const router = express.Router();


/*
/user/register
*/
router.post('/register',addUserController);

/*
/user/login
*/
router.post('/login',authenticationController);

/*
/user/forgot-password
*/
router.post('/forgot-password',forgotPasswordController);

/*
/user/reset-password
*/
router.post('/reset-password',resetPasswordController);


/*
/user/all
*/
router.get('/all',Authorization(['admin']),getAllUserController);

/*
/user/6494659bee473020415c02e0
*/
router.get('/:id',Authorization(['admin','customer']),getOneUserController);


/*
/user/6494659bee473020415c02e0
*/
router.put('/:id',Authorization(['customer']),updateUserController);


module.exports = router;