const User = require('../db/models/User');
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

//  set quantity of logged in user cart
router.put('/:userId', async (req, res, next) => {
  try {
    const plantAndCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        isComplete: false,
      },
      include: {
        model: Plant,
        through: {
          where: {
            plantId: req.body.plantId,
          },
        },
      },
    });
    let plant = plantAndCart.plants[0];
    let plantToBeUpdated = await plant.update(req.body);

    await plantAndCart.setPlants([plant], {
      through: { quantity: req.body.quantity },
    });
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

module.exports = router;
