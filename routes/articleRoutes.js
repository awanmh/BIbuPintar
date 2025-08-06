// backend/routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const commentController = require('../controllers/commentController'); 
const { protect, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // <-- 1. Impor middleware upload

// Route publik
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);

// Route admin (butuh login dan role admin)
// 2. Tambahkan upload.single('image') di sini
router.post('/', protect, isAdmin, upload.single('image'), articleController.createArticle);
router.put('/:id', protect, isAdmin, upload.single('image'), articleController.updateArticle);
router.delete('/:id', protect, isAdmin, articleController.deleteArticle);

// === Rute Komentar ===
router.get('/:articleId/comments', commentController.getCommentsForArticle);
router.post('/:articleId/comments', protect, commentController.createComment);
router.delete('/:articleId/comments/:commentId', protect, isAdmin, commentController.deleteComment);

module.exports = router;
