const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true // dibuat nullable agar login Google bisa tanpa password
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'local' // atau 'google'
  },
  role: {
    type: DataTypes.ENUM('visitor', 'admin'),
    defaultValue: 'visitor'
  }
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
