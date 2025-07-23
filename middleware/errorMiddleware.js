// middleware/errorMiddleware.js

/**
 * Middleware penanganan error terpusat.
 * Ditempatkan paling akhir di rantai middleware di server.js.
 * @param {Error} err - Object error yang dilempar
 * @param {Request} req - Object request Express
 * @param {Response} res - Object response Express
 * @param {NextFunction} next - Fungsi next Express
 */
const errorHandler = (err, req, res, next) => {
  // Log error ke konsol untuk debugging (penting di development)
  console.error("================ ERROR ================");
  console.error(`Timestamp: ${new Date().toISOString()}`);
  console.error(`Route: ${req.method} ${req.originalUrl}`);
  console.error(err.stack);
  console.error("=====================================");

  // Jika response sudah terkirim, lewatkan ke handler default Express
  if (res.headersSent) {
    return next(err);
  }

  // Kirim response error yang generik ke client
  // Jangan membocorkan detail error ke client di lingkungan produksi
  res.status(500).json({
    message: "Terjadi kesalahan tak terduga pada server.",
    // Anda bisa menambahkan detail error di development:
    // error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler;