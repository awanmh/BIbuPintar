// routes/forumRoutes.js
const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController'); // pastikan file controller ini benar
const { protect, restrictTo } = require('../middleware/authMiddleware');

// ==================== RUTE PUBLIK ====================
// Semua pengguna (tanpa login) bisa melihat daftar pertanyaan & detail
router.get('/', forumController.getAllQuestions);
router.get('/:id', forumController.getQuestionById);

// ==================== RUTE KHUSUS LOGIN ====================
// Pengguna yang login (role: visitor atau admin) bisa mengajukan pertanyaan
router.post('/', protect, restrictTo('visitor', 'admin'), forumController.createQuestion);

// Admin saja yang bisa menjawab pertanyaan
router.post('/:id/answers', protect, restrictTo('admin'), forumController.createAnswer);

module.exports = router;
