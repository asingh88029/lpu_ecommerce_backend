const httpStatus = require('http-status');
const jwt = require('jsonwebtoken')
const {addUserService,findUserByEmailService,getOneUserService,getAllUserService,updateUserService} = require("../services/user.service");
const sendEmail = require('./../utils/email');

const secretKey = 'khdghkgjdhgjdgy286779163fehjwwvjhdegvjhgitye7826378363kjbek';

const bcrypt = require('bcryptjs'); 


async function addUserController(req,res){
    
    const {name,email,mobile,password,role} = req.body;

    if(email && password && name){

        // encrypt the password
        const encryPassword = await bcrypt.hash(password,10)

        const newUser = {
            email,
            name,
            password:encryPassword
        }

        // Generate username from email - ankit123@gmail.com

        const username = email.split('@')[0].toLowerCase();
        newUser.username = username

        // let's say if mobile is avail
        if(mobile){
            newUser.mobile= mobile;
        }
        // let's say if role is avail
        if(role){
            newUser.role = role;
        }

        const serviceData = await addUserService(newUser);

        if(serviceData.success){

            const text = "Hello "+ serviceData.data.name + "!,"+"\n"+"You are registered succesfully."+"\n"+"Thanks,\n"+"LPUKart Team"

            sendEmail(serviceData.data.email,"You are registered successfully",text)

            res.status(200).send({
                message:serviceData.message,
                data:serviceData.data
            })
        }else{
            res.status(500).send({
                message:serviceData.message
            })
        }
    }else{
        res.status(500).send({
            message:"name, email or password is missing"
        })
    }

}

async function authenticationController(req,res){

    const {email,password,role} = req.body;

    if(email && password && role){

        const userServiceData = await findUserByEmailService(email);

        if(!userServiceData.success){
            return res.status(httpStatus.UNAUTHORIZED).send({
                message:'User not found'
            })
        }

        const user = userServiceData.data;

        if(role!=user.role){
            return res.status(httpStatus.UNAUTHORIZED).send({
                message:"Role not found"
            })
        }

        const isPassMatch = await bcrypt.compare(password,user.password);

        if(!isPassMatch){
            return res.status(httpStatus.UNAUTHORIZED).send({
                message:"Password doesn't match"
            })
        }

        const jwtToken = jwt.sign({
            userId:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        },secretKey)

        return res.status(httpStatus.OK).send({
            token:jwtToken,
            message:"User authenticated successfully."
        })


    }else{
        res.status(httpStatus.BAD_REQUEST).send({
            message:"Email, Password or Role is missing"
        })
    }

}

async function getOneUserController(req,res){

    const id = req.params.id;

    const serviceData = await getOneUserService(id);

    if(serviceData.success){
        res.status(200).send({
            message:serviceData.message,
            data:serviceData.data
        })
    }else{
        res.status(500).send({
            message:serviceData.message
        })
    }

}

async function getAllUserController(req,res){


    const serviceData = await getAllUserService();

    if(serviceData.success){
        res.status(200).send({
            message:serviceData.message,
            data:serviceData.data
        })
    }else{
        res.status(500).send({
            message:serviceData.message
        })
    }

}

async function updateUserController(req,res){

    const id = req.params.id;

    const updatedUserData = req.body;

    const serviceData = await updateUserService(id,updatedUserData)

    if(serviceData.success){
        res.status(200).send({
            message:serviceData.message,
            data:serviceData.data
        })
    }else{
        res.status(500).send({
            message:serviceData.message
        })
    }

}

module.exports = {
    addUserController,
    authenticationController,
    getOneUserController,
    getAllUserController,
    updateUserController
};
