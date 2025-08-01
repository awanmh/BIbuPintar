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
// PENYEMPURNAAN KONFIGURASI CORS
// ==========================================================
const allowedOrigins = ['https://ibupintar.id', 'https://www.ibupintar.id'];

const corsOptions = {
  origin: allowedOrigins, // Langsung gunakan array untuk kejelasan
  credentials: true, // Izinkan pengiriman kredensial seperti token
  optionsSuccessStatus: 200
};

// 3. Pasang Middleware tingkat aplikasi
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Pasang Rute Utama
app.use('/api', mainRouter);

// 4A. Rute untuk Upload & menjadikan folder statis
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
    // ==========================================================
    // PENTING: Kembalikan ke { alter: true } untuk keamanan data
    // ==========================================================
    await db.sequelize.sync({ alter: true });
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
