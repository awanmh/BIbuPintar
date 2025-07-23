// models/Article.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Article extends Model {}

Article.init({
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  date_posted: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'Article' });

module.exports = Article;

