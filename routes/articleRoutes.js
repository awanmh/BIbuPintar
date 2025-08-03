const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const commentController = require('../controllers/commentController'); 
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Route publik
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
// Route admin (butuh login dan role admin)
router.post('/', protect, isAdmin, articleController.createArticle);
router.put('/:id', protect, isAdmin, articleController.updateArticle);
router.delete('/:id', protect, isAdmin, articleController.deleteArticle);
// ==========================================================
// RUTE BARU UNTUK KOMENTAR
// ==========================================================
// Ambil semua komentar untuk artikel dengan ID tertentu
router.get('/:articleId/comments', commentController.getCommentsForArticle);

// Buat komentar baru (membutuhkan login)
router.post('/:articleId/comments', protect, commentController.createComment);

// Hapus komentar (membutuhkan login & role admin)
router.delete('/:articleId/comments/:commentId', protect, isAdmin, commentController.deleteComment);
// ==========================================================


module.exports = router;
