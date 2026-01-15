const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const db = require('./db/db');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/users', userRouter);


app.listen(3000);