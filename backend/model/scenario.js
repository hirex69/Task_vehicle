const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  id: String,
  name: String,
  time: String,
});

module.exports = mongoose.model('Scenario', scenarioSchema);
