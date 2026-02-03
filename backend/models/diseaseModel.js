import mongoose from 'mongoose';

const diseaseSchema = mongoose.Schema({
    name : {
        type : String, 
    },
    image : {
        type : String,
    },
    causes : {
        type : Array
    },
    home_remedies : {
        type : Array
    },
    suggestions : {
        type : Array
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

export default mongoose.model('disease', diseaseSchema);