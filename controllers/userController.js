// controllers/userController.js
const { User } = require('../models');
// DI APLIKASI NYATA, ANDA PERLU:
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

/**
 * Membuat user baru.
 * PENTING: Ini adalah versi SANGAT sederhana tanpa enkripsi password.
 * JANGAN GUNAKAN DI PRODUKSI TANPA MENGIMPLEMENTASIKAN BCRYPT.
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // --- CONTOH DENGAN BCRYPT (WAJIB DI APLIKASI ASLI) ---
    // const { name, email, password, role } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = await User.create({ name, email, password: hashedPassword, role });
    // --------------------------------------------------------

    const newUser = await User.create({ name, email, role });
    res.status(201).json({ message: "User berhasil dibuat.", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat user.", error: error.message });
  }
};

/**
 * Mendapatkan semua user (Admin).
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Jangan pernah kirim password ke client
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data user.", error: error.message });
  }
};