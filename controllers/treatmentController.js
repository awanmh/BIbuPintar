//controllers/treatmentController.js
const { Treatment, PackageItem } = require('../models');
const slugify = require('../utils/slugify');

// Ambil semua treatment
exports.getAllTreatments = async (req, res) => {
  const treatments = await Treatment.findAll();
  res.json(treatments);
};

// Ambil treatment by ID
exports.getTreatmentById = async (req, res) => {
  const treatment = await Treatment.findByPk(req.params.id);
  res.json(treatment);
};

// Buat treatment baru
exports.createTreatment = async (req, res) => {
  const imageUrl = req.file ? `/uploads/treatments/${req.file.filename}` : null;

  const name = req.body.name;
  const slug = slugify(name);

  const newTreatment = await Treatment.create({
    ...req.body,
    imageUrl,
    slug
  });

  res.json(newTreatment);
};

// Perbarui treatment
exports.updateTreatment = async (req, res) => {
  const treatment = await Treatment.findByPk(req.params.id);
  if (!treatment) return res.status(404).json({ error: 'Treatment not found' });

  if (req.file) {
    req.body.imageUrl = `/uploads/treatments/${req.file.filename}`;
  }

  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  await treatment.update(req.body);
  res.json(treatment);
};

// Hapus treatment
exports.deleteTreatment = async (req, res) => {
  const treatment = await Treatment.findByPk(req.params.id);
  if (!treatment) return res.status(404).json({ error: 'Treatment not found' });

  await treatment.destroy();
  res.json({ message: 'Deleted' });
};

// Ambil hanya treatment tipe 'single'
exports.getSingleTreatments = async (req, res) => {
  const singles = await Treatment.findAll({ where: { type: 'single' } });
  res.json(singles);
};

// Ambil hanya treatment tipe 'package'
exports.getPackageTreatments = async (req, res) => {
  const packages = await Treatment.findAll({ where: { type: 'package' } });
  res.json(packages);
};

exports.getTreatmentBySlug = async (req, res) => {
  const treatment = await Treatment.findOne({ where: { slug: req.params.slug } });
  if (!treatment) {
    return res.status(404).json({ error: 'Treatment not found' });
  }
  res.json(treatment);
};

exports.addToPackage = async (req, res) => {
  const { packageId, treatmentId } = req.body;

  const pkg = await Treatment.findByPk(packageId);
  const item = await Treatment.findByPk(treatmentId);

  if (!pkg || !item || pkg.type !== 'package' || item.type !== 'single') {
    return res.status(400).json({ error: 'Invalid treatment or package' });
  }

  await PackageItem.create({ packageId, treatmentId });
  res.json({ message: 'Treatment added to package successfully' });
};
