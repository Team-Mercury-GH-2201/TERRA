const Plant = require('../db/models/Plant');
const Cart = require('../db/models/Cart');
const { models } = require('../db/index');
const plantCart = models.plantCart;

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
    if (await cartToAddTo.hasPlant(req.body.id)) {
      let cartId = cartToAddTo.id;
      let plantId = req.body.id;
      let associated = await plantCart.findOne({
        where: { plantId: plantId, cartId: cartId },
      });
      let quantity = associated.quantity++;
      await cartToAddTo.addPlant(req.body.id, {
        through: { quantity: quantity },
      });
      console.log('HI IF')
    } else if (!await cartToAddTo.hasPlant(req.body.id)) {
      await cartToAddTo.addPlant(req.body.id);
      console.log('HI ELSE')
    }

    const updatedCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        isComplete: false,
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
    console.log(req.body.id);
    
    const cartToAddTo = await Cart.findOne({
      where: {
        userId: req.params.userId,
        isComplete: false
      },
      include: [Plant],
    });
    await cartToAddTo.removePlant(req.body.id);
    const updatedCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        isComplete: false,
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
    const result = await cart.addPlant(plant, {
      through: { quantity: req.body.quantity },
    });
    const finalCart = await Cart.findOne({
      where: { id: req.params.cartId, isComplete: false },
      include: [Plant],
    });
    res.json(finalCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
