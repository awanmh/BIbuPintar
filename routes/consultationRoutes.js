// routes/consultationRoutes.js
const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Rute Publik: Siapapun bisa mengirim form konsultasi
router.post('/', consultationController.submitConsultation);

// Rute Admin: Hanya admin yang bisa melihat semua dan menghapus konsultasi
router.get('/', protect, isAdmin, consultationController.getAllConsultations);
router.delete('/:id', protect, isAdmin, consultationController.deleteConsultation);

module.exports = router;