// controllers/categoryController.js
const { Category } = require('../models');

// Membuat kategori baru (Admin)
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = await Category.create({ name, description });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat kategori.", error: error.message });
  }
};

// Mendapatkan semua kategori
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data kategori.", error: error.message });
  }
};