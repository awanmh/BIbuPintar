// ============== file: backend/models/Reservation.js ==============
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reservation = sequelize.define('Reservation', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    service_type: { type: DataTypes.ENUM('yoga_prenatal', 'pijat_bayi'), allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'confirmed', 'canceled'), defaultValue: 'pending' }
  });
  return Reservation;
};