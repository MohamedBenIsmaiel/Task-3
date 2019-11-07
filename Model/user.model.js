const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');

const ENV    = require('../config/enviroVarible.json');

const userSchema = mongoose.Schema;
const User = new userSchema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        minlength:8,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        required:true
    }
})

User.methods.generateToken = function (){
    const token = jwt.sign({_id:this._id,name:this.name},ENV.jwtPrivateKey);
    return token;
}
exports.User = mongoose.model('User',User);
