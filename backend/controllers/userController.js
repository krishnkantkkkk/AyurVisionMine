const userModel = require('../models/userModel')
const {hashGenerator} = require('../utils/hashGenerator');
const {tokenGenerator} = require('../utils/tokenGenerator');
const {verifyPassword} = require('../utils/verifyPassword');
const jwt = require('jsonwebtoken');

module.exports.userRegister = async (req, res)=>{
    try{
        const {firstName, lastName, email, password} = req.body;
        if(await userModel.findOne({email})) return res.status(400).json({message : "User already exists"});
        const user = await userModel.create({
            firstName,
            lastName, 
            email,
            password : await hashGenerator(password)
        });
        user.password = undefined;
        const token = tokenGenerator({userid : user._id});
        res.cookie("token", token);
        return res.status(201).json({user});
    }catch(err){
        console.log(err.message);
    }
}

module.exports.userLogin = async (req, res)=>{ 
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email}).select("+password");
        if(user){
           const result = await verifyPassword(password, user.password);
           if(result) {
                const token = tokenGenerator({userid : user._id});
                res.cookie('token', token);
                user.password = undefined;
                return res.status(201).json({user});
           }
           return res.status(401).json({message : "Invalid email or password"});
        }
        return res.status(401).json({message : "Invalid email or passowrd"});
    }catch(err){
        console.log(err.message);
    }
}

module.exports.userLogout = (req, res)=>{
    try{
        res.clearCookie('token');
        res.json({message : "Logout Successfull"});
    }catch(err){
        console.log(err.message);
    }
}

module.exports.userUpdate = async (req, res)=>{
    try{
        const {firstName, lastName, email, age} = req.body;
        const user = await userModel.findOneAndUpdate({_id : req.user._id}, {firstName, lastName, email, age}, {new : true});
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
}

module.exports.userProfile = (req, res)=>{
    res.status(200).json(req.user);
}