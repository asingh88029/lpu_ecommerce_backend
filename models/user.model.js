const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    name:String,
    email:String,
    mobile:String,
    password:String
})

const UserModel = mongoose.model('users',userSchema);

module.exports = UserModel;