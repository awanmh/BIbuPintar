// backend/models/index.js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env]; // Asumsikan Anda memiliki config.json
const db = {};

let sequelize;
// Jika Anda menggunakan file config.json untuk kredensial
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Jika Anda menggunakan variabel .env langsung (seperti kasus Anda)
  sequelize = require('../config/database');
}

// Baca semua file model di direktori ini secara otomatis
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
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Definisikan semua relasi (associations) di sini
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ==================== RELASI EKSPLISIT ====================
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
