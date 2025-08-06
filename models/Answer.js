// ============== file: backend/models/Answer.js ==============
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Answer = sequelize.define('Answer', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
    // Foreign keys (user_id, question_id) akan ditambahkan oleh relasi di index.js
  });
  return Answer;
};
