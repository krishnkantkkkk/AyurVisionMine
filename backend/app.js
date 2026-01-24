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

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173"
}));

app.use('/users', userRouter);
app.use('/diseases', isLoggedIn, diseaseRouter);

app.listen(3000);