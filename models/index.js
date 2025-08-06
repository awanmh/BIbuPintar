// backend/models/index.js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

// Langsung gunakan koneksi dari config/database.js
const sequelize = require('../config/database');

// Membaca semua file model dari direktori ini secara otomatis
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Pastikan model diimpor sebagai fungsi yang menerima sequelize dan DataTypes
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Menjalankan fungsi associate jika ada untuk mendefinisikan relasi
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ==================== DEFINISI RELASI EKSPLISIT ====================
// Pastikan nama model (misal: 'User', 'Article') sesuai dengan yang Anda definisikan

// User - Article
db.User.hasMany(db.Article, { foreignKey: 'author_id', as: 'articles' });
db.Article.belongsTo(db.User, { foreignKey: 'author_id', as: 'author' });

// Category - Article
db.Category.hasMany(db.Article, { foreignKey: 'category_id', as: 'articles' });
db.Article.belongsTo(db.Category, { foreignKey: 'category_id', as: 'category' });

// User - Testimonial
db.User.hasMany(db.Testimonial, { foreignKey: 'user_id' });
db.Testimonial.belongsTo(db.User, { as: 'user', foreignKey: 'user_id' });

// User - Question
db.User.hasMany(db.Question, { foreignKey: 'user_id', as: 'questions' });
db.Question.belongsTo(db.User, { foreignKey: 'user_id', as: 'asker' });

// User - Answer
db.User.hasMany(db.Answer, { foreignKey: 'user_id', as: 'answers' });
db.Answer.belongsTo(db.User, { foreignKey: 'user_id', as: 'author' });

// Question - Answer
db.Question.hasMany(db.Answer, { foreignKey: 'question_id', as: 'answers' });
db.Answer.belongsTo(db.Question, { foreignKey: 'question_id', as: 'question' });

module.exports = db;
