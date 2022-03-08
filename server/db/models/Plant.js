const Sequelize = require('sequelize');
const db = require('../db');

const Plant = db.define('plant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
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
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imageLink: {
    type: Sequelize.STRING,
    defaultValue:
      'https://lh3.googleusercontent.com/h_XMcnkmJ8YaF69F4rhKtFLtGVA3zauAlOcjJHfAn0kpo1UfIyyVym61rHfovPgFIQpiRWfRPcnokafO59Ad1MyC3FvuiSSrGSe5cVgNXhcjoOmTf_eDHOodChWKvX9Yor3NO_TX9A=w600-h315-p-k',
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Plant;
