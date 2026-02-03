import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URI)
.then(()=>{console.log("DB connected")})
.catch((err)=>{console.log(err.message)});

export default mongoose.connection