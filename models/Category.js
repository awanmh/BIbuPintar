// models/Category.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model {}

Category.init({
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING }
}, {
  sequelize,
  modelName: 'Category',
  timestamps: false
});

module.exports = Category;
