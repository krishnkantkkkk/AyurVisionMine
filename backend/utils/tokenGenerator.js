import jwt from 'jsonwebtoken';

const tokenGenerator = (element)=>{
    return jwt.sign(element, process.env.JWT_KEY);
}

export default tokenGenerator