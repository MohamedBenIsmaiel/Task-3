const router = require('express').Router();
const Lodash = require('lodash');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const autho   = require('../Middleware/auth');

const {User} = require('../Model/user.model');
const {validateLogin,validateSignUp} = require('../validation/usr.validation')

router.post('/reg',async (req,res,next)=>{
    const {error} = validateSignUp(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User Already Registered !');

    user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)

    await user.save();
    let token = user.generateToken();
    user = Lodash.pick(user,['_id','name','email']);

    res.header('x-authToken',token).status(200).send({
        success:true,
        message:"Have been registred",
        user:user
    });
})

router.post('/login',async(req,res,next)=>{
    const {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Email Or Password is Invalid');

    let validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Email Or Password is Invalid');
    let token = user.generateToken();
    res.status(200).send({
        success:true,
        Message:'you have been logged',
        token:token
    })
})

router.put('/profile',autho,async(req,res,next)=>{
    let user = await User.updateOne({_id:req.user._id},Lodash.pick(req.body,['name','email','password']));
    if(!user) return res.status(400).send('invlid data ..!');

    
    res.status(200).send({
        success:true,
        Message:"Updated"
    })
    
})



module.exports = router;