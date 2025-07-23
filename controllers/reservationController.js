// controllers/reservationController.js
const { Reservation } = require('../models');

/**
 * Menerima dan menyimpan data reservasi baru.
 * Diakses melalui: POST /api/reservations
 */
exports.createReservation = async (req, res) => {
  try {
    const { name, email, phone, service_type, date, time } = req.body;
    if (!name || !email || !phone || !service_type || !date || !time) {
      return res.status(400).json({ message: "Semua field wajib diisi." });
    }

    const newReservation = await Reservation.create({
      name, email, phone, service_type, date, time
    });

    res.status(201).json({
      message: "Reservasi berhasil dibuat. Silakan tunggu konfirmasi dari kami.",
      data: newReservation
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server saat membuat reservasi.",
      error: error.message
    });
  }
};

/**
 * (Untuk Admin) Mengambil semua data reservasi.
 * Diakses melalui: GET /api/reservations
 */
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      order: [['date', 'ASC'], ['time', 'ASC']]
    });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data reservasi.",
      error: error.message
    });
  }
};

/**
 * (Untuk Admin) Mengubah status reservasi (misal: dari pending ke confirmed).
 * Diakses melalui: PUT /api/reservations/:id
 */
exports.updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // status bisa 'confirmed' atau 'canceled'

    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservasi tidak ditemukan." });
    }

    reservation.status = status;
    await reservation.save();

    res.status(200).json({
      message: `Status reservasi berhasil diubah menjadi ${status}.`,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengubah status reservasi.",
      error: error.message
    });
  }
};