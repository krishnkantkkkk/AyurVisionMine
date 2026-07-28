import cloudinary from '../config/cloudinary.js';
import diseaseModel from '../models/diseaseModel.js';
import analyzeImage from '../utils/analyzeImage.js';
import getLlmResponse from '../utils/getLlmResponse.js';
import classifySkinImage from '../utils/classifySkinImage.js';
import mongoose from 'mongoose';

export const createDisease = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Image is required" });
        console.log("Starting parallel Cloudinary upload & Gemini classification...");
        
        const base64Image = req.file.buffer.toString('base64');
        const dataUri = `data:${req.file.mimetype};base64,${base64Image}`;
        
        // Launch Cloudinary upload and Gemini Classification concurrently
        const cloudinaryPromise = cloudinary.uploader.upload(dataUri, { folder: "diseaseImage" });
        const classificationPromise = classifySkinImage(null, base64Image, req.file.mimetype);

        // Wait for both Cloudinary upload and Gemini classification simultaneously
        const [cloudinary_response, classification] = await Promise.all([
            cloudinaryPromise,
            classificationPromise
        ]);

        const image_url = cloudinary_response.url;
        console.log("Cloudinary Upload & Gemini Classification Completed!");
        console.log("Classification result:", classification);

        if (!classification.is_skin || classification.classification === 'NOT_SKIN') {
            return res.status(400).json({
                message: "Please upload a valid skin image. The provided image is not recognized as human skin.",
                classification
            });
        }

        if (classification.is_healthy || classification.classification === 'HEALTHY') {
            console.log("Skin classified as HEALTHY. Bypassing ML Model...");
            const diseaseName = "Healthy Skin";
            const seriousness = "Healthy (No Disease Detected)";
            
            console.log("Getting LLM Report for Healthy Skin...");
            const response = await getLlmResponse("healthy", "healthy");
            console.log("Report Collected!");

            const disease = await diseaseModel.create({
                name: diseaseName,
                home_remedies: response?.home_remedies || [],
                suggestions: response?.suggestions || [],
                causes: response?.causes || [],
                all_predictions: [],
                suggestion_seriousness: seriousness,
                patient: req.user._id,
                image: image_url
            });
            return res.status(201).json({ disease });
        } else {
            console.log("Skin classified as UNHEALTHY. Analyzing image with ML Model...");
            const report = await analyzeImage(image_url);
            const diseaseName = "Unhealthy Skin";

            const allPredictions = report?.response?.all_predictions || [
                {
                    category: report?.response?.prediction || "Skin Lesion",
                    confidence: report?.response?.prediction_confidence || 100
                }
            ];

            console.log("Getting LLM Report for Unhealthy Skin with all predictions:", allPredictions);
            const response = await getLlmResponse(allPredictions, "unhealthy");
            console.log("Report Collected!");
            
            const disease = await diseaseModel.create({
                name: diseaseName,
                home_remedies: response?.home_remedies || [],
                suggestions: response?.suggestions || [],
                causes: response?.causes || [],
                all_predictions: allPredictions,
                suggestion_seriousness: report?.response?.prediction_confidence,
                patient: req.user._id,
                image: image_url
            });
            return res.status(201).json({ disease });
        }
    } catch (err) {
        console.error("createDisease error:", err);
        const errorMsg = err?.message || (typeof err === 'string' ? err : "Internal Server Error");
        res.status(500).json({ message: errorMsg });
    }
}

export const fetchOneDisease = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Not Found" });
        }
        const disease = await diseaseModel.findOne({ _id: id, patient: req.user._id }).lean();
        if (disease) return res.status(200).json({ disease });
        return res.status(404).json({ message: "Not Found" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetchOnePatientAllDiseases = async (req, res) => {
    try {
        const diseasesList = await diseaseModel.find({ patient: req.user._id }).lean();
        return res.status(200).json({ diseasesList });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}