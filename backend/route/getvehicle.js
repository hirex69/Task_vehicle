// routes/scenarioRoutes.js

const express = require('express');
const router = express.Router();
const scenarioController = require('../controller/getvehiclecontroller');

// Route to fetch vehicles based on scenario name
router.get('/:scenarioName/vehicles', scenarioController.getVehiclesByScenarioName);

module.exports = router;
