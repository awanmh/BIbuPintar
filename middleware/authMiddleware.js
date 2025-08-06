// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware untuk memproteksi rute (hanya user login yang boleh)
exports.protect = async (req, res, next) => {
  let token;

  // Ambil token dari header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Ambil token dari header
      token = req.headers.authorization.split(' ')[1];

      // 2. Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Ambil user dari database (tanpa password)
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return res.status(401).json({ message: 'User yang terkait dengan token ini tidak lagi ada.' });
      }

      req.user = user; // lampirkan user ke req
      next();
    } catch (error) {
      console.error('TOKEN VERIFICATION ERROR:', error);
      return res.status(401).json({ message: 'Akses ditolak, token tidak valid atau kedaluwarsa.' });
    }
  }

  // Jika tidak ada token sama sekali
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, tidak ada token.' });
  }
};

// Middleware khusus hanya untuk admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Akses ditolak, rute ini hanya untuk admin.' });
  }
};
