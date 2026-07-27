import mongoose from 'mongoose'
import env from '../config/env.js'

mongoose.connect(env.DB_URI)
.then(()=>{console.log("DB connected")})
.catch((err)=>{console.error(err)});

export default mongoose.connection;