// routes/uploadRoutes.js
const express = require('express');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  res.status(200).json({
    message: 'Gambar berhasil diunggah',
    imagePath: `/uploads/${req.file.filename}`
  });
});

module.exports = router;
