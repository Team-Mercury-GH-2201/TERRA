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

router.get('/:id', async (req, res, next) => {
  console.log('params', req.params)
  try {
    const singlePlant = await Plant.findByPk(req.params.id)
    res.send(singlePlant)
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
