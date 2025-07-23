// models/Treatment.js
const { DataTypes } = require('sequelize');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Ganti spasi dengan tanda hubung
    .replace(/[^\w\-]+/g, '')    // Hapus karakter spesial
    .replace(/\-\-+/g, '-');     // Hapus duplikat tanda hubung
}

module.exports = (sequelize) => {
  const Treatment = sequelize.define('Treatment', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM('single', 'package'),
      defaultValue: 'single',
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER
    },
    booking_link: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'treatments',
    timestamps: true,
    hooks: {
  beforeValidate: (treatment) => {
    if (!treatment.slug && treatment.name) {
      treatment.slug = slugify(treatment.name);
    }
  },
  beforeUpdate: (treatment) => {
    if (treatment.changed('name')) {
      treatment.slug = slugify(treatment.name);
    }
  }
}

  });

  return Treatment;
};
