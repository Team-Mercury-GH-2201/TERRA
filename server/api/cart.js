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
    // use req.params to find user's plant in cart
    const plantAndCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        isComplete: false,
      },
      include: {
        model: Plant,
        where: {
          id: req.body.id,
        },
      },
    });
    let plant = plantAndCart.plants[0];
    let plantToBeUpdated = await plant.update(req.body);
    res.json(plantToBeUpdated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
