import cloudinary from '../config/cloudinary.js';
import diseaseModel from '../models/diseaseModel.js';
import analyzeImage from '../utils/analyzeImage.js';
import getLlmResponse from '../utils/getLlmResponse.js';

export const createDisease = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Image is required" });
        console.log("Analyzing...")
        const base64Image = req.file.buffer.toString('base64');
        const dataUri = `data:${req.file.mimetype};base64,${base64Image}`
        console.log("Uploading...")
        const cloudinary_response = await cloudinary.uploader.upload(dataUri, { folder: "diseaseImage" });
        const image_url = cloudinary_response.url;
        console.log("Upload Done!!!", image_url[0]);
        const report = await analyzeImage(image_url);
        console.log("Getting LLM Report...");
        const response = await getLlmResponse(report.response.prediction);
        console.log("Report Collected!!! ", response != {});
        const disease = await diseaseModel.create({
            name: report.response.prediction,
            home_remedies: response.home_remedies,
            suggestions: response.suggestions,
            causes: response.causes,
            suggestion_seriousness: report.response.prediction_confidence,
            patient: req.user._id,
            image: image_url
        });
        res.status(201).json({ disease });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetchOneDisease = async (req, res) => {
    try {
        const { id } = req.params;
        const disease = await diseaseModel.findOne({ _id: id, patient: req.user._id });
        if (disease) return res.status(200).json({ disease });
        return res.status(404).json({ message: "Not Found" });
    } catch (err) {
        console.log(err.message);
    }
}

export const fetchOnePatientAllDiseases = async (req, res) => {
    try {
        const diseasesList = await diseaseModel.find({ patient: req.user._id });
        return res.status(200).json({ diseasesList });
    } catch (err) {
        console.log(err.message);
    }
}