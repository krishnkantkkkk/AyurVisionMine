import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import diseaseRouter from './routes/diseaseRouter.js'
import isLoggedIn from './middlewares/isLoggedIn.js'

import './db/db.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors({
    origin : process.env.FRONTEND_ORIGIN, 
    credentials: true
}));

app.use('/users', userRouter);
app.use('/diseases', isLoggedIn, diseaseRouter);

app.listen(PORT, process.env.HOST, ()=>{console.log(`Server Running on port : ${PORT}`)});