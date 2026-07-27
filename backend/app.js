import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from 'express'
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import diseaseRouter from './routes/diseaseRouter.js'
import isLoggedIn from './middlewares/isLoggedIn.js'
import env from './config/env.js'

import './db/db.js'

const app = express();
const PORT = env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors({
    origin : env.FRONTEND_ORIGIN, 
    credentials: true
}));
app.get('/', (req, res)=>{
    res.json({message : "This is the AyurvisionAi Backend."})
})
app.use('/users', userRouter);
app.use('/diseases', isLoggedIn, diseaseRouter);

app.listen(PORT, env.HOST, ()=>{console.log(`Server Running on port : ${PORT}`)});