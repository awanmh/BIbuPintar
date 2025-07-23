// models/Testimonial.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Testimonial extends Model {}

Testimonial.init({
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, { sequelize, modelName: 'Testimonial' });

module.exports = Testimonial;
