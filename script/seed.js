'use strict';

const {
  db,
  models: { User, Plant, Cart },
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
    User.create({ username: 'cody', email: 'cody@gmail.com', password: '1234', isAdmin: true }),
    User.create({ username: 'amber', email: 'amber@gmail.com', password: '5678', isAdmin: true }),
    User.create({ username: 'lauren', email: 'lauren@gmail.com', password: '9012', isAdmin: true }),
    User.create({ username: 'anna', email: 'anna@gmail.com', password: '123', isAdmin: true }),
    User.create({ username: 'grace', email: 'grace@gmail.com', password: '123', isAdmin: true }),
    User.create({ username: 'maxiel', email: 'maxiel@gmail.com', password: '123', isAdmin: true }),
    User.create({ username: 'johanna', email: 'johanna@gmail.com', password: '123', isAdmin: true }),
    User.create({ username: 'murphy', email: 'murphyisagoodboy@gmail.com', password: '123' }),
    User.create({ username: 'joel', email: 'joel@gmail.com', password: '123' }),
    User.create({ username: 'tom', email: 'tomgoodman@gmail.com', password: '123' }),
    User.create({ username: 'sally', email: 'hellosally@gmail.com', password: '123' }),
    User.create({ username: 'annabelle', email: 'annabelle1955@gmail.com', password: '123' }),
    User.create({ username: 'sailer', email: 'sailer123@gmail.com', password: '123' }),
    User.create({ username: 'kyu', email: 'kyu9068@gmail.com', password: '123' }),
    User.create({ username: 'tommy4', email: 'tommy4@gmail.com', password: '123' }),
    User.create({ username: 'murphy436', email: 'murphy436@gmail.com', password: '123' }),
    User.create({ username: 'hannah', email: 'hannaa@gmail.com', password: '123' }),
    User.create({ username: 'Bart', email: 'Bartisagoodboy@gmail.com', password: '123' }),
    User.create({ username: 'Monika', email: 'Monikaisa@gmail.com', password: '123' }),
    User.create({ username: 'Juelle', email: 'Juelle123@gmail.com', password: '123' }),
    User.create({ username: 'Sammy', email: 'Sammy678@gmail.com', password: '123' }),
    User.create({ username: 'Jonathan', email: 'Jojo@gmail.com', password: '123' }),
    User.create({ username: 'Jose', email: 'Jose.Gonzalez@gmail.com', password: '123' }),
  ]);

  // Creating Plants
  const plants = await Promise.all([
    Plant.create({
      name: 'Anna The Pitcher',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 2000,
    }),
    Plant.create({
      name: 'Violet',
      species: 'Flower',
      description: 'Is nice smelling plant.',
      careInstructions: 'Some of water and light.',
      price: 2000,
      imageLink: 'https://i.pinimg.com/originals/88/1f/30/881f30fc530ad3fabfd6a8147a7d3201.jpg'
    }),
    Plant.create({
      name: 'Robot plant',
      species: 'Pitcherous',
      description: 'Is ROBOT plant.',
      careInstructions: 'None needed',
      price: 6000,
      imageLink: 'https://ae01.alicdn.com/kf/HTB1F.IbKFXXXXbUaXXXq6xXFXXXE/New-Ceramic-Flower-Pot-Cute-Cartoon-Smile-Robot-Creative-Nursery-Potted-Flowers-Small-Planter-Pots-Succulents.jpg_640x640.jpg'
    }),
    Plant.create({
      name: 'Fog',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 2000,
      imageLink: 'https://www.foodhero.org/sites/foodhero-prod/files/styles/seed_card_size/public/seed-photos/Screenshot%202020-10-27%20at%202.48.31%20PM.png?itok=1ZoR_G5L'
    }),
    Plant.create({
      name: 'Horseshoe',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 2099,
      imageLink: 'https://mk0minimumdesigfnelb.kinstacdn.com/wp-content/uploads/2021/03/Pot-Praha-2-370x370.jpg'
    }),
    Plant.create({
      name: 'Venus',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 2299,
      imageLink: 'https://animals.sandiegozoo.org/sites/default/files/styles/image_grid_half_width/public/2016-10/venus_flytrap_02.jpg?itok=G2GxizCx'
    }),
    Plant.create({
      name: 'Figgy',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 2050,
      imageLink: 'https://cdn10.bigcommerce.com/s-jg374jqeyq/products/780/images/1020/P2160_LOL_preset_ftd-mx-tile-wide-lv-new__80181.1642751417.500.500.jpg?c=2'
    }),
    Plant.create({
      name: 'Slimy',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 2000,
      imageLink: 'https://www.refinery29.com/images/9588157.jpg'
    }),
    Plant.create({
      name: 'Peace Lily',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light and space.',
      price: 2000,
      imageLink: 'https://www.whitleysflowers.com/system/images/cache/553455f5536cbb08d1b9c343bf74a8c2.370x370.jpg'
    }),
    Plant.create({
      name: 'Sunflower',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Lots of water and light.',
      price: 2000,
      imageLink: 'https://img.bridgecatalog.com/product_full/CCD/charles_viancin_11_sunflower_silicone_lid_-_yellow-1.jpg?33736f6a7ff6233bcf60105b0b2ca533'
    }),
    Plant.create({
      name: 'Peppers',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
      imageLink: 'https://www.foodhero.org/sites/foodhero-prod/files/styles/seed_card_size/public/seed-photos/Screenshot%202020-10-27%20at%203.32.16%20PM.png?itok=aKidlZj6'
    }),
    Plant.create({
      name: 'Spikey',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
      imageLink: 'https://cfadesigngroup.com/wp-content/uploads/2021/01/IMG_8907__04222.1611427345.1280.1280-370x370.jpg'
    }),
    Plant.create({
      name: 'Monika',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 5000,
      imageLink: 'https://www.friendsofeloisebutler.org/generaljpegs/Seasons/local/wildpoinsettia370sq.jpg'
    }),
    Plant.create({
      name: 'Harvey',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 3990,
      imageLink: 'https://cdn.shopify.com/s/files/1/0551/6489/products/Ponytail-Plant_370x.jpg?v=1540330449'
    }),
    Plant.create({
      name: 'Tim',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 2000,
      imageLink: 'https://cdn.shopify.com/s/files/1/0344/2586/4328/products/14-TheSnakePlant-2_370x480.jpg?v=1627921512'
    }),
    Plant.create({
      name: 'Ricky',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
      imageLink: 'https://cdn.cloudfastin.top/assets/2021/03/6f1b7813cba4dab84dd640855483f780-370x370.jpg'
    }),
    Plant.create({
      name: 'Tom',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 20.0,
      imageLink: 'https://cdn.shopify.com/s/files/1/1702/7305/products/IMG_0641_370x370_2bb95dff-0129-4b76-8de4-075cedc25a56_550x550.jpg?v=1594708985'
    }),
    Plant.create({
      name: 'Sally',
      species: 'Pitcherous',
      description: 'Is AWESOME plant.',
      careInstructions: 'Just water',
      price: 2000,
      imageLink: 'https://cdn.shopify.com/s/files/1/0344/2586/4328/products/Anthurium-3_370x480.jpg?v=1639787625'
    }),
  ]);

  const cart1 = await Cart.create({})
  const cart2 = await Cart.create({})
  const cart3 = await Cart.create({})
  const cart4 = await Cart.create({})
  const cart5 = await Cart.create({})
  const cart6 = await Cart.create({})
  const cart7 = await Cart.create({})

  await cart1.setUser(users[7]);
  await cart2.setUser(users[8]);
  await cart3.setUser(users[9])
  await cart4.setUser(users[10])
  await cart5.setUser(users[11])
  await cart6.setUser(users[12])
  await cart7.setUser(users[13])

  await cart1.addPlants([plants[0], plants[1], plants[2]]);
  await cart2.addPlants([plants[3], plants[4], plants[5]]);
  await cart3.addPlants([plants[3]]);
  await cart4.addPlants([plants[3], plants[4]]);
  await cart5.addPlants([plants[3], plants[4], plants[5], plants[6]]);
  try {
    await cart5.addPlants([plants[1]], {through: {quantity: 2}});
  } catch (error) {
    console.error(error);
  }
  

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
