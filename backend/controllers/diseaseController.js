const { default: cloudinary } = require('../config/cloudinary');
const diseaseModel = require('../models/diseaseModel')

module.exports.createDisease = async (req, res)=>{
    try{
        const {name, description, date, remedies, suggestion, cause, suggestion_seriousness} = req.body;
        const disease = await diseaseModel.create({
            name, 
            description, 
            date, 
            remedies, 
            suggestion, 
            cause, 
            suggestion_seriousness,
            patient : req.user._id
        });
        res.status(201).json({disease});
    }catch(err){
        console.log(err.message);
    }
}

module.exports.fetchOneDisease = async (req, res)=>{
    try {
        const {id} = req.body;
        const disease = diseaseModel.findOne({_id : id, patient : req.user._id});
        if(disease) return res.status(200).json(disease);
        return res.status(404).json({message : "Not Found"});
    } catch(err){
        console.log(err.message);
    }
}

module.exports.fetchOnePatientAllDiseases = async (req, res)=>{
    try{
        const diseasesList = await diseaseModel.find({patient : req.user._id});
        return res.status(200).json({diseasesList});
    }catch(err){
        console.log(err.message);
    }
}

module.exports.analyzeDisease = async (req, res) =>{
    try{
        const base64Image = req.file.buffer.toString('base64');
        const dataUri = `data:${req.file.mimetype};base64,${base64Image}`
        const result = await cloudinary.uploader.upload(dataUri, {folder : "diseaeImage"});
        const disease = await diseaseModel.create({
            name : "Alchoimiosis",
            description : "This is the disease",
            image : result.url,
            patient : req.user._id
        })
        res.status(201).send(disease);
        // res.status(201).json(result);
    }catch(err){
        console.log(err.message);
    }
}