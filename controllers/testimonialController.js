// controllers/testimonialController.js
const { Testimonial, User } = require('../models');

// Membuat testimonial baru
exports.createTestimonial = async (req, res) => {
  try {
    // Di aplikasi nyata, user_id akan diambil dari token otentikasi (req.user.id)
    const { user_name, message, user_id } = req.body;
    const newTestimonial = await Testimonial.create({ user_name, message, user_id });
    res.status(201).json({ message: "Terima kasih atas testimoni Anda!", data: newTestimonial });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengirim testimoni.", error: error.message });
  }
};

// Mendapatkan semua testimonial (yang sudah disetujui)
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      // Di aplikasi nyata, Anda mungkin ingin menambahkan filter `where: { approved: true }`
      include: {
        model: User,
        as: 'user',
        attributes: ['name', 'role'] // Hanya ambil nama dan role dari user
      },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data testimoni.", error: error.message });
  }
};