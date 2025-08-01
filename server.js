// server.js

// 1. Impor semua modul yang dibutuhkan
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./models');
const mainRouter = require('./routes');
const errorHandler = require('./middleware/errorMiddleware');

// 2. Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================================
// PERBAIKAN CORS DI SINI
// ==========================================================
// Izinkan permintaan hanya dari domain frontend Anda
const corsOptions = {
  origin: 'https://ibupintar.id',
  optionsSuccessStatus: 200
};

// 3. Pasang Middleware tingkat aplikasi
app.use(cors(corsOptions)); // Gunakan konfigurasi CORS yang spesifik
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Pasang Rute Utama
app.use('/api', mainRouter);

// 4A. Rute untuk Upload & menjadikan folder statis
// CATATAN: Ini tidak akan bekerja dengan baik di lingkungan produksi seperti Railway/Render
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 5. Rute dasar untuk mengecek apakah server berjalan
app.get('/', (req, res) => {
  res.send('🎉 Selamat Datang di API Website Ibu Hamil! Server berjalan dengan baik.');
});

// 6. Pasang Error Handling Middleware
app.use(errorHandler);

// 7. Fungsi untuk menjalankan server
const startServer = async () => {
  try {
    await db.sequelize.sync();
    console.log("✅ Database berhasil tersinkronisasi.");

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan dengan gagah di port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Gagal menyambungkan atau sinkronisasi database:", error);
  }
};

// 8. Jalankan server!
startServer();
