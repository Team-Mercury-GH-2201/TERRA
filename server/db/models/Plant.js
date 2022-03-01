const Sequelize = require('sequelize');
const db = require('../db');

const Plant = db.define('plant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  species: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  careInstructions: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL,
  },
  imageLink: {
    type: Sequelize.STRING,
    defaultValue: '/plant_baby_2.0.png',
  },
});

module.exports = Plant;
