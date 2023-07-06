const httpStatus = require("http-status");
const config = require("./../config/config");
const jwt = require("jsonwebtoken");
const {
  addUserService,
  forgotPasswordService,
  resetPasswordService,
  findUserByEmailService,
  getOneUserService,
  getAllUserService,
  updateUserService,
} = require("../services/user.service");
const sendEmail = require("./../utils/email");

const secretKey = config.JWT_SECRET_KEY;

const bcrypt = require("bcryptjs");

async function addUserController(req, res) {
  const { name, email, mobile, password, role } = req.body;

  if (email && password && name) {
    // encrypt the password
    const encryPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      name,
      password: encryPassword,
    };

    // Generate username from email - ankit123@gmail.com

    const username = email.split("@")[0].toLowerCase();
    newUser.username = username;

    // let's say if mobile is avail
    if (mobile) {
      newUser.mobile = mobile;
    }
    // let's say if role is avail
    if (role) {
      newUser.role = role;
    }

    const serviceData = await addUserService(newUser);

    if (serviceData.success) {
      const text =
        "Hello " +
        serviceData.data.name +
        "!," +
        "\n" +
        "You are registered succesfully." +
        "\n" +
        "Thanks,\n" +
        "LPUKart Team";

      sendEmail(
        serviceData.data.email,
        "You are registered successfully",
        text
      );

      res.status(200).send({
        message: serviceData.message,
        data: serviceData.data,
      });
    } else {
      res.status(500).send({
        message: serviceData.message,
      });
    }
  } else {
    res.status(500).send({
      message: "name, email or password is missing",
    });
  }
}

async function authenticationController(req, res) {
  const { email, password, role } = req.body;

  if (email && password && role) {
    const userServiceData = await findUserByEmailService(email);

    if (!userServiceData.success) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: "User not found",
      });
    }

    const user = userServiceData.data;

    if (role != user.role) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: "Role not found",
      });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (!isPassMatch) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: "Password doesn't match",
      });
    }

    const jwtToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      secretKey
    );

    return res.status(httpStatus.OK).send({
      token: jwtToken,
      message: "User authenticated successfully.",
    });
  } else {
    res.status(httpStatus.BAD_REQUEST).send({
      message: "Email, Password or Role is missing",
    });
  }
}

async function forgotPasswordController(req, res) {
  const { email } = req.body;

  if (email) {
    const userServiceData = await findUserByEmailService(email);

    if (!userServiceData.success) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: "User not found",
      });
    }

    const user = userServiceData.data;

    const otp = Math.floor(100000 + Math.random() * 900000); // 100000-999999

    const otpExpireTime = new Date(Date.now() + 15 * 60 * 1000);

    const forgotServiceData = await forgotPasswordService(
      user.email,
      otp,
      otpExpireTime
    );

    if (forgotServiceData) {
      const text =
        "Your OTP to reset password is " +
        otp +
        " ." +
        "\n\nYour OTP will expire in " +
        otpExpireTime +
        " ";

      sendEmail(user.email, "OTP for password reset", text);

      return res.status(httpStatus.CREATED).send({
        message: "Your OTP is successfully sent to the registered email id.",
      });
    } else {
      return res.status(httpStatus.CREATED).send({
        message: "Something went wrong",
      });
    }
  } else {
    res.status(httpStatus.BAD_REQUEST).send({
      message: "Email is missing",
    });
  }
}

async function resetPasswordController(req, res) {
  const { otp, email, password } = req.body;

  if (email && otp && password) {
    const userServiceData = await findUserByEmailService(email);

    if (!userServiceData.success) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: "User not found",
      });
    }

    const user = userServiceData.data;

    // encrypt the password
    const encryPassword = await bcrypt.hash(password, 10);

    const resetServiceData = await resetPasswordService(
      email,
      otp,
      encryPassword
    );

    if (resetServiceData.success) {
      const text =
        "Hello " +
        user.name +
        ",\n\n" +
        "Your password is updated successfully.\n" +
        "If you haven't updated the password, ping us on this mail ASAP.\n Thanks,\n Team LPUKart";

      sendEmail(user.email, "Password Updated", text);

      return res.status(httpStatus.CREATED).send({
        message: "Your Password is updated successfully.",
      });
    } else {
      return res.status(httpStatus.CREATED).send({
        message: resetServiceData.message,
      });
    }
  } else {
    res.status(httpStatus.BAD_REQUEST).send({
      message: "Email or OTP or Passwword is missing",
    });
  }
}

async function getOneUserController(req, res) {

  let id = ""  
  if (req.role == "admin") {
    id = req.params.id;
  } else {
    if (req.params.id == req.userId) {
      id = req.params.id;
    } else {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: "Trying to excess anothers details.",
      });
    }
  }

  const serviceData = await getOneUserService(id);

  if (serviceData.success) {
    res.status(200).send({
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    res.status(500).send({
      message: serviceData.message,
    });
  }
}

async function getAllUserController(req, res) {
  const serviceData = await getAllUserService();

  if (serviceData.success) {
    res.status(200).send({
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    res.status(500).send({
      message: serviceData.message,
    });
  }
}

async function updateUserController(req, res) {
  let id ="";

  if(req.userId==req.params.id){
    id = req.params.id;
  }else{
    return res.status(httpStatus.UNAUTHORIZED).send({
        message:"You are trying to update someone else information."
    })
  }

  const updatedUserData = req.body;

  const serviceData = await updateUserService(id, updatedUserData);

  if (serviceData.success) {
    res.status(200).send({
      message: serviceData.message,
      data: serviceData.data,
    });
  } else {
    res.status(500).send({
      message: serviceData.message,
    });
  }
}

module.exports = {
  addUserController,
  authenticationController,
  forgotPasswordController,
  resetPasswordController,
  getOneUserController,
  getAllUserController,
  updateUserController,
};
