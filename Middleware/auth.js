const jwt = require('jsonwebtoken');
const ENV    = require('../config/enviroVarible.json');


module.exports = (req,res,next)=>{
  let token = req.header('x-authToken');
  if(!token) return res.status(401).send('you dont have a token');

  try{

    let validToken =  jwt.verify(token,ENV.jwtPrivateKey);
     req.user = validToken;
     next();
  }catch(ex){

      res.status(400).send('Invalid Token');
  }
}
