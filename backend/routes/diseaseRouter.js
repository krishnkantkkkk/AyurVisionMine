const express = require('express');
const router = express.Router();
const { createDisease, fetchOneDisease, analyzeDisease, fetchOnePatientAllDiseases } = require('../controllers/diseaseController');
const upload = require('../utils/multerConfig')

router.post('/create', upload.single("image"), createDisease);
router.get('/fetchOne/:id', fetchOneDisease);
router.get('/fetchOnePatientAllDiseases', fetchOnePatientAllDiseases)
// router.post('/analyze', upload.single("image"), analyzeDisease);

module.exports = router;