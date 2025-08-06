// ============== file: backend/models/Consultation.js ==============
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Consultation = sequelize.define('Consultation', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    topic: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    submitted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });
  return Consultation;
};