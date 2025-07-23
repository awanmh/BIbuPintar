// routes/index.js
const express = require('express');
const router = express.Router();
const forumRoutes = require('./forumRoutes');

// Impor controller yang relevan
const categoryController = require('../controllers/categoryController');
const testimonialController = require('../controllers/testimonialController');
const userController = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const authRoutes = require('./authRoutes');

// Impor file-file rute
const articleRoutes = require('./articleRoutes');
const consultationRoutes = require('./consultationRoutes');
const reservationRoutes = require('./reservationRoutes');
const treatmentRoutes = require('./treatmentRoutes');



// Daftarkan setiap rute ke path dasarnya
router.use('/articles', articleRoutes);
router.use('/consultations', consultationRoutes);
router.use('/reservations', reservationRoutes);
router.use('/treatments', treatmentRoutes);


// --- Rute Tambahan untuk Controller Lain ---

// Rute untuk Categories
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', protect, isAdmin, categoryController.createCategory);

// Rute untuk Testimonials
router.get('/testimonials', testimonialController.getAllTestimonials);
router.post('/testimonials', testimonialController.createTestimonial); // Diasumsikan semua user bisa memberi testimoni

// Rute untuk Users (Hanya Admin)
router.get('/users', protect, isAdmin, userController.getAllUsers);
router.post('/users', protect, isAdmin, userController.createUser);

router.use('/tanya-bidan', forumRoutes); // Ganti nama endpoint

router.use('/auth', authRoutes);


module.exports = router;