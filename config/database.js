// backend/config/database.js

require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;

// Cek jika ada DATABASE_URL (untuk platform seperti Render)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Konfigurasi untuk development lokal dan Railway (yang menggunakan variabel terpisah)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql'
    }
  );
}

module.exports = sequelize;
