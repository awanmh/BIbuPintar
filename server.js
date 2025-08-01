// server.js

// 1. Impor semua modul yang dibutuhkan
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./models'); // Sequelize models
const mainRouter = require('./routes'); // Main API routes
const errorHandler = require('./middleware/errorMiddleware');

// 2. Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Konfigurasi CORS agar hanya domain tertentu yang diizinkan
const allowedOrigins = ['https://ibupintar.id', 'https://www.ibupintar.id'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// 4. Middleware global
app.use(cors(corsOptions)); // CORS
app.use(express.json()); // Body parser JSON
app.use(express.urlencoded({ extended: true })); // URL-encoded parser

// 5. Routing API utama
app.use('/api', mainRouter);

// 6. Rute upload & folder statis untuk file yang diunggah
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 7. Rute dasar tes koneksi
app.get('/', (req, res) => {
  res.send('🎉 Selamat Datang di API Website Ibu Hamil! Server berjalan dengan baik.');
});

// 8. Error handling global
app.use(errorHandler);

// 9. Jalankan server & sinkronisasi database
const startServer = async () => {
  try {
    await db.sequelize.sync({ alter: true }); // Bisa diubah ke { force: true } hanya untuk development
    console.log('✅ Database berhasil tersinkronisasi.');

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Gagal memulai server atau koneksi database:', error);
  }
};

// 10. Eksekusi
startServer();
