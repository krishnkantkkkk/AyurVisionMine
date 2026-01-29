const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const db = require('./db/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const diseaseRouter = require('./routes/diseaseRouter');
const { isLoggedIn } = require('./middlewares/isLoggedIn');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({
    origin : process.env.FRONTEND_ORIGIN
}));

app.use('/users', userRouter);
app.use('/diseases', isLoggedIn, diseaseRouter);

app.listen(PORT, process.env.HOST, ()=>{console.log(`Server Running on port : ${PORT}`)});