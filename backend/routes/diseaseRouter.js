const express = require('express');
const router = express.Router();
const { createDisease, fetchOneDisease, analyzeDisease, fetchOnePatientAllDiseases } = require('../controllers/diseaseController');
const upload = require('../utils/multerConfig')

router.post('/create', createDisease);
router.get('/fetchOne', fetchOneDisease);
router.get('/fetchOnePatientAllDiseases', fetchOnePatientAllDiseases)
router.post('/analyze', upload.single("image"), analyzeDisease);

module.exports = router;