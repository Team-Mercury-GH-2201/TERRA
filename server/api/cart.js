const User = require('../db/models/User');
const Plant = require('../db/models/Plant');
const Cart = require('../db/models/Cart');

const router = require('express').Router();

router.get('/:cartId', async (req, res, next) => {
    try {
        const cart = await Cart.findByPk(req.params.cartId, {
            include: [Plant]
        })
        res.json(cart);

    } catch (error) {
        next(error)
    }
})


module.exports = router;