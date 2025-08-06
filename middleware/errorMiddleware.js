// middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  // Log error ke konsol untuk debugging
  console.error("================ ERROR ================");
  console.error(`Timestamp: ${new Date().toISOString()}`);
  console.error(`Route: ${req.method} ${req.originalUrl}`);
  // PERBAIKAN: Log seluruh objek error, bukan hanya stack-nya
  console.error(err); 
  console.error("=====================================");

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    message: "Terjadi kesalahan tak terduga pada server.",
  });
};

module.exports = errorHandler;
