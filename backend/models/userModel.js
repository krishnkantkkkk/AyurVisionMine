const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
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
    }
})

module.exports = mongoose.model('user', userSchema);