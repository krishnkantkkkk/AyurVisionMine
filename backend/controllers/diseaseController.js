const cloudinary = require('../config/cloudinary');
const diseaseModel = require('../models/diseaseModel');
const {analyzeImage} = require('../utils/analyzeImage');

module.exports.createDisease = async (req, res)=>{
    try{
        console.log("Analyzing...")
        const base64Image = req.file.buffer.toString('base64');
        const dataUri = `data:${req.file.mimetype};base64,${base64Image}`
        console.log("Uploading...")
        const cloudinary_response = await cloudinary.uploader.upload(dataUri, {folder : "diseaeImage"});
        const image_url = cloudinary_response.url;
        console.log("Upload Done!!!", image_url)
        const report = await analyzeImage(image_url);
        const disease = await diseaseModel.create({
            name : report.response.prediction, 
            // description, 
            // date, 
            // remedies, 
            // suggestion, 
            // cause, 
            suggestion_seriousness : report.response.prediction_confidence,
            patient : req.user._id,
            image : image_url
        });
        res.status(201).json({disease});
    }catch(err){
        console.log(err.message);
    }
}

module.exports.fetchOneDisease = async (req, res)=>{
    try {
        const {id} = req.params;
        const disease = await diseaseModel.findOne({_id : id, patient : req.user._id});
        if(disease) return res.status(200).json({disease});
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

// module.exports.analyzeDisease = async (req, res) =>{
//     try{
//         const base64Image = req.file.buffer.toString('base64');
//         const dataUri = `data:${req.file.mimetype};base64,${base64Image}`
//         const result = await cloudinary.uploader.upload(dataUri, {folder : "diseaeImage"});
//         const disease = await diseaseModel.create({
//             name : "Alchoimiosis",
//             description : "This is the disease",
//             image : result.url,
//             patient : req.user._id
//         })
//         res.status(201).send(disease);
//     }catch(err){
//         console.log(err.message);
//     }
// }