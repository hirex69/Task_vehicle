const express = require('express');
const router = express.Router();
const Scenario = require('../model/scenario');

router.get('/', async (req, res) => {
  try {
    const scenarios = await Scenario.find();
    res.json(scenarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
