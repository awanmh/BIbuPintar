// controllers/authController.js
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Fungsi untuk membuat token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Fungsi untuk Registrasi User Baru
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nama, email, dan password harus diisi.' });
    }

    // 2. Cek apakah user sudah ada
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Buat user baru
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Kirim respons dengan token
    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Data pengguna tidak valid.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
  }
};

// Fungsi untuk Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    // 2. Cek user dan bandingkan password
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Email atau password salah.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
  }
};

// Fungsi untuk mendapatkan data user yang sedang login
exports.getMe = async (req, res) => {
    // Data user sudah dilampirkan di req.user oleh middleware 'protect'
    const { id, name, email, role } = req.user;
    res.status(200).json({ id, name, email, role });
};

// Login via Google OAuth
exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Buat akun baru jika belum ada
      user = await User.create({
        name,
        email,
        googleId,
        password: '', // Tidak diperlukan karena pakai Google
      });
    }

    // Login berhasil - kirim token
    const token = generateToken(user.id);

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('[Google Login Error]', error.message);
    res.status(401).json({ message: 'Login Google gagal', error: error.message });
  }
};
