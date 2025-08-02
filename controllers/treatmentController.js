// controllers/treatmentController.js
const { Treatment, PackageItem } = require('../models');
const slugify = require('../utils/slugify');

// Ambil semua treatment
exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.findAll();
    res.json(treatments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch treatments.' });
  }
};

// Ambil treatment by ID
exports.getTreatmentById = async (req, res) => {
  try {
    const treatment = await Treatment.findByPk(req.params.id);
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found.' });
    }
    res.json(treatment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch treatment.' });
  }
};

// ==========================================================
// PERBAIKAN DI FUNGSI INI
// ==========================================================
exports.createTreatment = async (req, res) => {
  try {
    // Dapatkan path gambar jika ada file yang diunggah
    const imageUrl = req.file ? `/uploads/treatments/${req.file.filename}` : null;

    // Buat treatment baru. Slug akan dibuat otomatis oleh model.
    const newTreatment = await Treatment.create({
      ...req.body,
      imageUrl,
    });

    res.status(201).json(newTreatment);
  } catch (error) {
    console.error('Error creating treatment:', error); // Log error untuk debugging
    
    // Kirim pesan error yang lebih spesifik jika ada duplikat
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Treatment dengan nama ini sudah ada.' });
    }
    
    // Kirim pesan error umum
    res.status(500).json({ message: 'Terjadi kesalahan pada server saat membuat treatment.' });
  }
};

// Perbarui treatment
exports.updateTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByPk(req.params.id);
    if (!treatment) return res.status(404).json({ error: 'Treatment not found' });

    if (req.file) {
      req.body.imageUrl = `/uploads/treatments/${req.file.filename}`;
    }

    // Slug akan di-update otomatis oleh hook di model jika nama berubah
    await treatment.update(req.body);
    res.json(treatment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update treatment.' });
  }
};

// Hapus treatment
exports.deleteTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByPk(req.params.id);
    if (!treatment) return res.status(404).json({ error: 'Treatment not found' });

    await treatment.destroy();
    res.json({ message: 'Treatment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete treatment.' });
  }
};

// ... sisa fungsi lainnya (getTreatmentBySlug, dll.) tetap sama ...
exports.getTreatmentBySlug = async (req, res) => {
  try {
    const treatment = await Treatment.findOne({ where: { slug: req.params.slug } });
    if (!treatment) {
      return res.status(404).json({ error: 'Treatment not found' });
    }
    res.json(treatment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch treatment.' });
  }
};

exports.addToPackage = async (req, res) => {
  try {
    const { packageId, treatmentId } = req.body;
    const pkg = await Treatment.findByPk(packageId);
    const item = await Treatment.findByPk(treatmentId);

    if (!pkg || !item || pkg.type !== 'package' || item.type !== 'single') {
      return res.status(400).json({ error: 'Invalid treatment or package' });
    }

    await PackageItem.create({ packageId, treatmentId });
    res.json({ message: 'Treatment added to package successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add treatment to package.' });
  }
};
