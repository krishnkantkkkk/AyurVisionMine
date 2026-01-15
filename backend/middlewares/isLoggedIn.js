const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports.isLoggedIn = async (req, res, next)=>{
    try{
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).json({message : "Unauthorized1"});
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({_id : data.userid});
        if(!user){
            res.clearCookie('token');
            return res.status(401).json({message : "Unauthorized2"});
        }
        req.user = user;
        next();
    }catch(err){
        res.clearCookie('token');
        return res.status(401).json({message : "Unauthorized3"});
    }
}