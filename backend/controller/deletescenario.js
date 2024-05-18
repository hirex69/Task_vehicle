const express = require('express');
const router = express.Router();
const Scenario = require('../model/scenario');

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Scenario.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
