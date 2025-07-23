// models/PackageItem.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PackageItem = sequelize.define('PackageItem', {
    packageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    treatmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'package_items',
    timestamps: false,
  });

  return PackageItem;
};
