// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Rute Publik: Siapapun bisa membuat reservasi
router.post('/', reservationController.createReservation);

// Rute Admin: Hanya admin yang bisa melihat semua reservasi dan mengubah statusnya
router.get('/', protect, isAdmin, reservationController.getAllReservations);
router.put('/:id', protect, isAdmin, reservationController.updateReservationStatus);

module.exports = router;