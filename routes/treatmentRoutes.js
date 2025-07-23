// routes/treatmentRoutes.js
const express = require('express');
const controller = require('../controllers/treatmentController');
const upload = require('../middleware/upload'); // Import upload dari middleware

const router = express.Router();

router.get('/', controller.getAllTreatments);
router.get('/slug/:slug', controller.getTreatmentBySlug);
router.get('/:id', controller.getTreatmentById);
router.get('/single', controller.getSingleTreatments);
router.get('/package', controller.getPackageTreatments);
router.post('/', upload.single('image'), controller.createTreatment);
router.put('/:id', upload.single('image'), controller.updateTreatment);
router.delete('/:id', controller.deleteTreatment);
// routes/treatmentRoutes.js
router.post('/add-to-package', controller.addToPackage);

module.exports = router;
