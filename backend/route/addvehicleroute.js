const express = require('express');
const router = express.Router();
const vehicleController = require('../controller/vehiclecontroller');

// Route to add a vehicle to a specific scenario by scenario name
router.post('/vehicles', vehicleController.addVehicleToScenario);

module.exports = router;
