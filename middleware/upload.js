// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Konfigurasi Cloudinary dengan environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigurasi storage engine untuk Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ibu_pintar/treatments', // Nama folder di Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Format file yang diizinkan
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Contoh transformasi gambar
  },
});

// Inisialisasi multer dengan storage Cloudinary
const upload = multer({ storage: storage });

module.exports = upload;
