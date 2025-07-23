// controllers/articleController.js
const { Article, User, Category } = require('../models');

// Membuat artikel baru (Admin)
exports.createArticle = async (req, res) => {
  try {
    const { title, content, author_id, category_id } = req.body;
    if (!title || !content || !author_id || !category_id) {
        return res.status(400).json({ message: "Title, content, author_id, dan category_id wajib diisi."});
    }
    const newArticle = await Article.create({ title, content, author_id, category_id });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat artikel.", error: error.message });
  }
};

// Mendapatkan semua artikel dengan data author dan kategori
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [['date_posted', 'DESC']],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['name'] // Hanya ambil nama penulis
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name'] // Hanya ambil nama kategori
        }
      ]
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data artikel.", error: error.message });
  }
};

// Mendapatkan satu artikel berdasarkan ID
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id, { // findByPk adalah cara terbaik mencari berdasarkan ID
      include: [
        { model: User, as: 'author', attributes: ['name'] },
        { model: Category, as: 'category', attributes: ['name'] }
      ]
    });

    if (!article) {
      // Jika artikel dengan ID tsb tidak ada di DB, kirim 404
      return res.status(404).json({ message: "Artikel tidak ditemukan." });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil artikel.", error: error.message });
  }
};

// Mengupdate artikel (Admin)
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category_id, imageUrl } = req.body; // tambahkan imageUrl
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan." });
    }

    // Update semua field jika tersedia
    article.title = title || article.title;
    article.content = content || article.content;
    article.category_id = category_id || article.category_id;
    article.imageUrl = imageUrl || article.imageUrl; // ini penting

    await article.save();

    res.status(200).json({ message: "Artikel berhasil diperbarui.", data: article });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate artikel.", error: error.message });
  }
};


// Menghapus artikel (Admin)
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan." });
    }

    await article.destroy();
    res.status(200).json({ message: "Artikel berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus artikel.", error: error.message });
  }
};