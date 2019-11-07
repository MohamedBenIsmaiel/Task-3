const Joi = require('joi');

function validateLogin(usr){
 const schema = {
   email:Joi.string().min(8).required().email(),
   password:Joi.string().min(6).required()
 }
  return Joi.validate(usr,schema);
}

function validateSignUp(usr){
  const schema = {
   name:Joi.string().min(5).required(),
   email:Joi.string().min(8).required().email(),
   password:Joi.string().min(6).required(),
 }
  return Joi.validate(usr,schema);
}

exports.validateLogin = validateLogin;
exports.validateSignUp= validateSignUp;
