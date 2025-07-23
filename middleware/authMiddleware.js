const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware untuk memproteksi rute (hanya user login yang boleh)
exports.protect = async (req, res, next) => {
  let token;

  // Ambil token dari header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Jika tidak ada token
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, tidak ada token.' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ambil user dari database (tanpa password)
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan.' });
    }

    req.user = user; // lampirkan user ke req
    next();
  } catch (error) {
    console.error('Token tidak valid:', error.message);
    return res.status(401).json({ message: 'Akses ditolak, token tidak valid.' });
  }
};

// Middleware untuk membatasi role tertentu
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Akses ditolak, role tidak sesuai.' });
    }
    next();
  };
};

// Middleware khusus hanya untuk admin (versi ringkas dari restrictTo)
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Akses ditolak, hanya admin yang diizinkan.' });
  }
  next();
};
