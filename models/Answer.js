//Answer.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Answer extends Model {}

Answer.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Answer'
});

module.exports = Answer;
