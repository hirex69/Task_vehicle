const express = require('express');
const router = express.Router();
const Scenario = require('../model/scenario');

router.post('/', async (req, res) => {
  try {
    const newScenario = new Scenario(req.body);
    await newScenario.save();
    res.status(201).json(newScenario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
