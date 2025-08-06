// backend/models/Article.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Article = sequelize.define('Article', {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    date_posted: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });
  return Article;
};