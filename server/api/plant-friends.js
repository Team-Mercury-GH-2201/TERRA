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
  try {
    const singlePlant = await Plant.findByPk(req.params.id)
    res.send(singlePlant)
  }
  catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Plant.create(req.body));
  } catch (error) {
    next(error);
  }
})

// /api/plant-friends:id
router.put('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id)
    console.log('here is the plant', plant)
    console.log('here is req.body', req.body)
    res.send(await plant.update(req.body));
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id);
    await plant.destroy();
    res.send(plant);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
