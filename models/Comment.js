// backend/models/Comment.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // articleId dan userId akan ditambahkan secara otomatis melalui relasi
  }, {
    tableName: 'comments',
    timestamps: true,
  });

  return Comment;
};
