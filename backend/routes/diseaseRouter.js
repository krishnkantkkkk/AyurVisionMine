import express from 'express';
import { createDisease, fetchOneDisease, fetchOnePatientAllDiseases } from '../controllers/diseaseController.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router.post('/create', upload.single("image"), createDisease);
router.get('/fetchOne/:id', fetchOneDisease);
router.get('/fetchOnePatientAllDiseases', fetchOnePatientAllDiseases)

export default router