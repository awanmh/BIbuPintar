// models/Consultation.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Consultation extends Model {}

Consultation.init({
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  topic: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  submitted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'Consultation' });

module.exports = Consultation;
