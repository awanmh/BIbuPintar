// models/Reservation.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Reservation extends Model {}

Reservation.init({
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  service_type: { type: DataTypes.ENUM('yoga_prenatal', 'pijat_bayi'), allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'confirmed', 'canceled'), defaultValue: 'pending' }
}, { sequelize, modelName: 'Reservation' });

module.exports = Reservation;
