// middlewares/roleMiddleware.js

/**
 * Middleware untuk memastikan pengguna adalah ADMIN
 */
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang diperbolehkan.' });
};

/**
 * Middleware untuk memastikan pengguna adalah USER biasa
 */
exports.isUser = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    return next();
  }
  return res.status(403).json({ message: 'Akses ditolak. Hanya user biasa yang diperbolehkan.' });
};

/**
 * Middleware opsional untuk mengecek apakah pengguna login
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(401).json({ message: 'Anda harus login terlebih dahulu.' });
};
