// controllers/consultationController.js
const { Consultation } = require('../models');

/**
 * Menerima dan menyimpan data konsultasi baru dari form.
 * Diakses melalui: POST /api/consultations
 */
exports.submitConsultation = async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;
    // Validasi input dasar
    if (!name || !email || !topic || !message) {
      return res.status(400).json({ message: "Semua field wajib diisi." });
    }

    const newConsultation = await Consultation.create({ name, email, topic, message });

    res.status(201).json({
      message: "Form konsultasi berhasil dikirim. Kami akan segera menghubungi Anda.",
      data: newConsultation
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server saat mengirim konsultasi.",
      error: error.message
    });
  }
};

/**
 * (Untuk Admin) Mengambil semua data konsultasi.
 * Diakses melalui: GET /api/consultations
 */
exports.getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.findAll({
      order: [['submitted_at', 'DESC']] // Urutkan dari yang terbaru
    });
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data konsultasi.",
      error: error.message
    });
  }
};

/**
 * (Untuk Admin) Menghapus data konsultasi.
 * Diakses melalui: DELETE /api/consultations/:id
 */
exports.deleteConsultation = async (req, res) => {
    try {
        const { id } = req.params;
        const consultation = await Consultation.findByPk(id);

        if (!consultation) {
            return res.status(404).json({ message: "Konsultasi tidak ditemukan." });
        }

        await consultation.destroy();
        res.status(200).json({ message: "Konsultasi berhasil dihapus." });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus konsultasi.",
            error: error.message
        });
    }
};