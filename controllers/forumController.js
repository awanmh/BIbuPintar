// controllers/questionController.js
const { Question, Answer, User } = require('../models');

// ✅ Ambil semua pertanyaan (untuk daftar forum)
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: {
        model: User,
        as: 'asker',
        attributes: ['name']
      },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(questions);
  } catch (error) {
    console.error('Gagal ambil pertanyaan:', error);
    res.status(500).json({ message: 'Gagal mengambil pertanyaan.', error: error.message });
  }
};

// ✅ Ambil satu pertanyaan beserta semua jawabannya
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'asker',
          attributes: ['name']
        },
        {
          model: Answer,
          as: 'answers', // ✅ tambahkan ini
          include: {
            model: User,
            as: 'author',
            attributes: ['name', 'role']
          }
        }
      ],
      order: [[{ model: Answer, as: 'answers' }, 'createdAt', 'ASC']]
    });

    if (!question) {
      return res.status(404).json({ message: 'Pertanyaan tidak ditemukan.' });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error('Gagal ambil detail pertanyaan:', error);
    res.status(500).json({ message: 'Gagal mengambil detail pertanyaan.', error: error.message });
  }
};


// ✅ Buat pertanyaan baru
exports.createQuestion = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.id;

    if (!title || !content) {
      return res.status(400).json({ message: 'Judul dan isi pertanyaan wajib diisi.' });
    }

    const newQuestion = await Question.create({
      title,
      content,
      user_id: userId
    });

    res.status(201).json({
      message: 'Pertanyaan berhasil dikirim.',
      data: newQuestion
    });
  } catch (error) {
    console.error('Gagal membuat pertanyaan:', error);
    res.status(500).json({ message: 'Gagal membuat pertanyaan.', error: error.message });
  }
};

// ✅ Tambah jawaban ke pertanyaan
exports.createAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user?.id;
    const questionId = req.params.id;

    if (!content) {
      return res.status(400).json({ message: 'Isi jawaban tidak boleh kosong.' });
    }

    const newAnswer = await Answer.create({
      content,
      user_id: userId,
      question_id: questionId
    });

    res.status(201).json({
      message: 'Jawaban berhasil dikirim.',
      data: newAnswer
    });
  } catch (error) {
    console.error('Gagal mengirim jawaban:', error);
    res.status(500).json({ message: 'Gagal mengirim jawaban.', error: error.message });
  }
};
