const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        type : String, 
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        select : false
    },
    age : {
        type : Number,
        default : 20
    }
})

module.exports = mongoose.model('user', userSchema);