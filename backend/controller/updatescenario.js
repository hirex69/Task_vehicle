const express = require('express');
const router = express.Router();
const Scenario = require('../model/scenario');

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedScenario = await Scenario.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedScenario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
