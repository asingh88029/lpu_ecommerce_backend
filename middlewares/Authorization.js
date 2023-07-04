const httpStatus = require('http-status');
const config = require('./../config/config'); 

const jwt = require('jsonwebtoken');

const secretKey = config.JWT_SECRET_KEY

const Authorization = (role) => (req,res,next)=>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(httpStatus.UNAUTHORIZED).send({
            message:"No token provided"
        })
    }

    console.log(token);

    try{

        const decode = jwt.verify(token,secretKey);

        if(decode.role!==role){
            return res.status(httpStatus.UNAUTHORIZED).send({
                message:"User Access Restricted"
            })
        }

        console.log(decode);

        req.userId= decode.userId,
        req.email=decode.email

        next()

    }catch(err){
        res.status(httpStatus.UNAUTHORIZED).send({
            error:"Token Invalid"
        })
    }
}

module.exports = Authorization