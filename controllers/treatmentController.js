// controllers/treatmentController.js
const { Treatment, PackageItem } = require('../models');

// Buat treatment baru
exports.createTreatment = async (req, res) => {
  try {
    // URL gambar sekarang didapat dari req.file.path yang diberikan oleh Cloudinary
    const imageUrl = req.file ? req.file.path : null;

    const newTreatment = await Treatment.create({
      ...req.body,
      imageUrl, // Simpan URL dari Cloudinary
    });

    res.status(201).json(newTreatment);
  } catch (error) {
    console.error('Error creating treatment:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Treatment dengan nama ini sudah ada.' });
    }
    res.status(500).json({ message: 'Terjadi kesalahan pada server saat membuat treatment.' });
  }
};

// Perbarui treatment
exports.updateTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByPk(req.params.id);
    if (!treatment) return res.status(404).json({ error: 'Treatment not found' });

    // Jika ada file baru yang diunggah, perbarui imageUrl
    if (req.file) {
      req.body.imageUrl = req.file.path;
    }

    await treatment.update(req.body);
    res.json(treatment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update treatment.' });
  }
};

// --- Fungsi lainnya ---

exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.findAll();
    res.json(treatments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch treatments.' });
  }
};

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

exports.getSingleTreatments = async (req, res) => {
  try {
    const singles = await Treatment.findAll({ where: { type: 'single' } });
    res.json(singles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch single treatments.' });
  }
};

exports.getPackageTreatments = async (req, res) => {
  try {
    const packages = await Treatment.findAll({ where: { type: 'package' } });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch package treatments.' });
  }
};

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
