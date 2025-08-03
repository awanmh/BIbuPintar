// backend/controllers/commentController.js
const { Comment, User } = require('../models');

// Mengambil semua komentar untuk sebuah artikel
exports.getCommentsForArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.findAll({
      where: { articleId },
      include: [{
        model: User,
        attributes: ['name'] // Ambil nama pengguna yang berkomentar
      }],
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil komentar.', error: error.message });
  }
};

// Membuat komentar baru
exports.createComment = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;
    const userId = req.user.id; // Diambil dari middleware 'protect'

    if (!content) {
      return res.status(400).json({ message: 'Komentar tidak boleh kosong.' });
    }

    const newComment = await Comment.create({
      content,
      articleId,
      userId
    });

    // Ambil kembali komentar dengan data user untuk ditampilkan di frontend
    const commentWithUser = await Comment.findByPk(newComment.id, {
      include: [{ model: User, attributes: ['name'] }]
    });

    res.status(201).json(commentWithUser);
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat komentar.', error: error.message });
  }
};

// Menghapus komentar (hanya admin)
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan.' });
    }

    await comment.destroy();
    res.status(200).json({ message: 'Komentar berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus komentar.', error: error.message });
  }
};
