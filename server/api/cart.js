const User = require('../db/models/User');
const Plant = require('../db/models/Plant');
const Cart = require('../db/models/Cart');

const router = require('express').Router();

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

module.exports = router;
