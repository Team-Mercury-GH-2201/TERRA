//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Plant = require('./models/Plant');
const Cart = require('./models/Cart');

//associations could go here!
User.hasMany(Cart);
Cart.belongsTo(User);

Plant.belongsToMany(Cart, { through: 'plant-cart' });
Cart.belongsToMany(Plant, { through: 'plant-cart' });

module.exports = {
  db,
  models: {
    User,
    Plant,
    Cart,
  },
};
