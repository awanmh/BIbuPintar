// controllers/articleController.js
const { Article, User, Category } = require('../models');

// Membuat artikel baru (Admin)
exports.createArticle = async (req, res) => {
  try {
    // Ambil URL gambar dari Cloudinary (via middleware 'upload')
    const imageUrl = req.file ? req.file.path : null;

    const { title, content, author_id, category_id } = req.body;
    if (!title || !content || !author_id || !category_id) {
      return res.status(400).json({ message: "Title, content, author_id, dan category_id wajib diisi." });
    }

    const newArticle = await Article.create({
      title,
      content,
      author_id,
      category_id,
      imageUrl, // Simpan URL dari Cloudinary
    });

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat artikel.", error: error.message });
  }
};

// Mengupdate artikel (Admin)
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan." });
    }

    // Jika ada file baru yang diunggah, perbarui imageUrl
    if (req.file) {
      req.body.imageUrl = req.file.path;
    }

    await article.update(req.body);

    res.status(200).json({ message: "Artikel berhasil diperbarui.", data: article });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate artikel.", error: error.message });
  }
};


// --- FUNGSI LAINNYA (TETAP SAMA) ---

// Mendapatkan semua artikel dengan data author dan kategori
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [['date_posted', 'DESC']],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['name']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name']
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
    const article = await Article.findByPk(id, {
      include: [
        { model: User, as: 'author', attributes: ['name'] },
        { model: Category, as: 'category', attributes: ['name'] }
      ]
    });

    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan." });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil artikel.", error: error.message });
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
