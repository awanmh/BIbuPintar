// backend/models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: true },
    googleId: { type: DataTypes.STRING, allowNull: true, unique: true },
    provider: { type: DataTypes.STRING, allowNull: true, defaultValue: 'local' },
    role: { type: DataTypes.ENUM('visitor', 'admin'), defaultValue: 'visitor' }
  });
  return User;
};