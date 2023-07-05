const httpStatus = require("http-status");
const config = require("./../config/config");

const jwt = require("jsonwebtoken");

const secretKey = config.JWT_SECRET_KEY;

const Authorization = (roles) => (req, res, next) => {

   console.log("Request coming") 

  const token = req.header("Authorization");

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: "No token provided",
    });
  }

  try {

    const decode = jwt.verify(token, secretKey);

    let rolesCheckStatus = false 
    for (let i = 0; i < roles.length; i++) {
      if (decode.role == roles[i]) {
        rolesCheckStatus=true
      }
    }

    console.log(decode.role)
    console.log(roles)
    console.log(rolesCheckStatus)

    if(!rolesCheckStatus){
        return res.status(httpStatus.UNAUTHORIZED).send({
            message:"User Access Restricted"
        })
    }

    req.userId= decode.userId,
    req.email=decode.email

    next();
  } catch (err) {
    console.log(err)
    res.status(httpStatus.UNAUTHORIZED).send({
      error: "Token Invalid",
    });
  }
};

module.exports = Authorization;
