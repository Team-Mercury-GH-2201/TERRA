//this is the access point for all things database related!

const db = require('./db');
const Sequelize = require('sequelize');

const User = require('./models/User');
const Plant = require('./models/Plant');
const Cart = require('./models/Cart');



//associations could go here!
User.hasMany(Cart);
Cart.belongsTo(User);

//defining our through table and adding a quantity column
const plantCart = db.define('plant-cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  }
});
Plant.belongsToMany(Cart, { through: plantCart });
Cart.belongsToMany(Plant, { through: plantCart });


module.exports = {
  db,
  models: {
    User,
    Plant,
    Cart,
  },
};
