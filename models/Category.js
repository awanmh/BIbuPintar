// ============== file: backend/models/Category.js ==============
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING }
  }, {
    timestamps: false // Tidak ada kolom createdAt dan updatedAt
  });
  return Category;
};