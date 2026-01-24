const mongoose = require('mongoose');

const diseaseSchema = mongoose.Schema({
    name : {
        type : String, 
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
    },
    cause : {
        type : String
    },
    remedies : {
        type : String
    },
    suggestion : {
        type : String
    },
    suggestion_seriousness : {
        type : Number
    },
    date : {
        type : Date,
        default : Date.now()
    },
    patient : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
})

module.exports = mongoose.model('disease', diseaseSchema);