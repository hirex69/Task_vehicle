const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({


  scenarioName: {
    type: String,

  },
  vehicleId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  initialPositionX: {
    type: Number,
    required: true
  },
  initialPositionY: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    required: true
  },
  direction: {
    type: String,
    enum: ['Towards', 'Backwards', 'Upwards', 'Downwards'],
    required: true
  },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
