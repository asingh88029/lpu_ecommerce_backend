const httpStatus = require('http-status');

const jwt = require('jsonwebtoken');

const secretKey = 'khdghkgjdhgjdgy286779163fehjwwvjhdegvjhgitye7826378363kjbek';

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