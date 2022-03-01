//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Plant = require('./models/Plant');

//associations could go here!
User.hasMany(Plant);
Plant.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Plant,
  },
};
