const Plant = require('../db/models/Plant');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
