import jwt from 'jsonwebtoken';
import env from '../config/env.js'

const tokenGenerator = (element)=>{
    return jwt.sign(element, env.JWT_KEY);
}

export default tokenGenerator