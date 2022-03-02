'use strict';

const {
  db,
  models: { User, Plant },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  // Creating Plants
  const plants = await Promise.all([
    Plant.create({
      name: 'Anna The Pitcher',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 20.0,
    }),
    Plant.create({
      name: 'Violet',
      species: 'Flower',
      description: 'Is nice smelling plant.',
      careInstructions: 'Some of water and light.',
      price: 20.0,
    }),
    Plant.create({
      name: 'Robot plant',
      species: 'Pitcherous',
      description: 'Is ROBOT plant.',
      careInstructions: 'None needed',
      price: 60.0,
    }),
    Plant.create({
      name: 'Fog',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 20.0,
    }),
    Plant.create({
      name: 'Horseshoe',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 20.0,
    }),
    Plant.create({
      name: 'Anna The Pitcher',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 20.0,
    }),
    Plant.create({
      name: 'Anna The Pitcher',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 20.0,
    }),
    Plant.create({
      name: 'Anna The Pitcher',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 20.0,
    }),
    Plant.create({
      name: 'Fig tree',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light and space.',
      price: 20.0,
    }),
    Plant.create({
      name: 'Sunflower',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 20.0,
    }),
    Plant.create({
      name: 'Ricky',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
    }),
    Plant.create({
      name: 'Juella',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
    }),
    Plant.create({
      name: 'Monika',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
    }),
    Plant.create({
      name: 'Harvey',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
    }),
    Plant.create({
      name: 'Tim',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
    }),
    Plant.create({
      name: 'Ricky',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
    }),
    Plant.create({
      name: 'Tom',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
    }),
    Plant.create({
      name: 'Sally',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
    }),


  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
