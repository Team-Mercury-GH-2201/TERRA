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
    let cartToAddTo = await Cart.findOne({
      where: {
        userId: req.params.userId,
        isComplete: false,
      },
      include: [Plant],
    });
    if (!cartToAddTo || cartToAddTo.isComplete === true) {
      cartToAddTo = await Cart.create({});
      cartToAddTo.setUser(req.params.userId);
    }
    await cartToAddTo.addPlant(req.body.id);
    const updatedCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        isComplete: false
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
      include: [Plant],
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
    next(error);
  }
});

router.put('/checkout/:cartId', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId);
    res.send(await cart.update(req.body));
  } catch (error) {
    next(error);
  }
});

//  set quantity of logged in user cart
router.put('/:cartId', async (req, res, next) => {
  try {
    const plant = await Plant.findOne({
      where: {
        id: req.body.plantId,
      },
      include: {
        model: Cart,
        through: {
          where: {
            cartId: req.params.cartId,
          },
        },
      },
    });
    const cart = await Cart.findOne({
      where: { id: req.params.cartId, isComplete: false },
    });
    const result = await cart.addPlant(plant, { through: { quantity: req.body.quantity } });
    const finalCart = await Cart.findOne({
      where: { id: req.params.cartId, isComplete: false },
      include: [Plant]
    })
    res.json(finalCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
