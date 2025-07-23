//Question
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Question extends Model {}

Question.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, { sequelize, modelName: 'Question' });

module.exports = Question;

