const jwt = require('jsonwebtoken');

const tokenGenerator = (element)=>{
    return jwt.sign(element, process.env.JWT_KEY);
}

module.exports.tokenGenerator = tokenGenerator;