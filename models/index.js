//models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Import semua model
const User = require('./User');
const Category = require('./Category');
const Article = require('./Article');
const Testimonial = require('./Testimonial');
const Consultation = require('./Consultation');
const Reservation = require('./Reservation');
const Question = require('./Question');
const Answer = require('./Answer');
const Treatment = require('./Treatment')(sequelize);

// Inisialisasi objek db
const db = {
  Sequelize,
  sequelize,
  User,
  Category,
  Article,
  Testimonial,
  Consultation,
  Reservation,
  Question,
  Answer,
  Treatment
};

// ==================== RELASI ====================

// User - Article
User.hasMany(Article, { foreignKey: 'author_id' });
Article.belongsTo(User, { as: 'author', foreignKey: 'author_id' });

// Category - Article
Category.hasMany(Article, { foreignKey: 'category_id' });
Article.belongsTo(Category, { as: 'category', foreignKey: 'category_id' });

// User - Testimonial
User.hasMany(Testimonial, { foreignKey: 'user_id' });
Testimonial.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

// User - Question
User.hasMany(Question, { foreignKey: 'user_id', as: 'questions' });
Question.belongsTo(User, { foreignKey: 'user_id', as: 'asker' }); // ✅ hanya ini untuk 'asker'

// User - Answer
User.hasMany(Answer, { foreignKey: 'user_id', as: 'answers' });
Answer.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

// Question - Answer
Question.hasMany(Answer, { foreignKey: 'question_id', as: 'answers' });
Answer.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

// Treatment - Package Items (self-relational many-to-many)
Treatment.belongsToMany(Treatment, {
  as: 'Items',
  through: 'package_items',
  foreignKey: 'packageId',
  otherKey: 'treatmentId'
});

module.exports = db;
