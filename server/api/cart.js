const Plant = require('../db/models/Plant');
const Cart = require('../db/models/Cart');

const router = require('express').Router();

// get logged-in user cart
router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        isComplete: false,
      },
      include: [Plant],
    });
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// add to cart api route
router.put('/add/:userId', async (req, res, next) => {
  try {
    const cartToAddTo = await Cart.findOne({
      where: {
        userId: req.params.userId,
      },
      include: [Plant]
    });
    await cartToAddTo.addPlant(req.body.id);
    const updatedCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
      },
      include: [Plant],
    });
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
});

// remove from cart
router.put('/remove/:userId', async (req, res, next) => {
  try {
    const cartToAddTo = await Cart.findOne({
      where: {
        userId: req.params.userId,
      },
      include: [Plant]
    });
    await cartToAddTo.removePlant(req.body.id);
    const updatedCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
      },
      include: [Plant],
    });
    res.json(updatedCart);
  } catch (error) {
    next(error)
  }
})

//  set quantity of logged in user cart
// router.put('/:cartId/:userId', async (req, res, next) => {
  // try {
    // const plantAndCart = await Cart.findOne({
      // where: {
        // userId: req.params.userId,
        // isComplete: false,
      // },
      // include: {
        // model: Plant,
        // through: {
          // where: {
            // plantId: req.body.plantId,
          // },
        // },
      // },
    // });
    // const cart = await Cart.findOne({
      // where: {
        // userId: req.params.userId,
        // isComplete: false,
      // },
    // });
    // let plant = plantAndCart.plants[0];
    // let plants = cart.plants
    // let plantToBeUpdated = await plant.update( { ['plant-cart']: req.body});
    // let plants = await cart.getPlants();
    // console.log('CART', cart); // this is cart object that has cartId and userID
    // console.log('CART AND PLANT', plantAndCart.plants[0]); // this is cart object with just one plant in array
    // console.log('PLANTS', plants); // array of plants in cart
    // await plantAndCart.setPlants([...plants, ...plant]], {
      // through: { quantity: req.body.quantity },
    // });
// 
    // res.json(plants);
  // } catch (error) {
    // next(error);
  // }
// });

module.exports = router;
