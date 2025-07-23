// backend/config/database.js

require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;

// Cek apakah aplikasi berjalan di lingkungan produksi (seperti Render)
// yang menyediakan DATABASE_URL.
if (process.env.DATABASE_URL) {
  // Konfigurasi untuk produksi (Render dengan PostgreSQL)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Wajib ada untuk koneksi ke database Render
      }
    },
    logging: false // Matikan logging SQL di produksi
  });
} else {
  // Konfigurasi untuk development (lokal dengan MySQL dari .env)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT
    }
  );
}

module.exports = sequelize;