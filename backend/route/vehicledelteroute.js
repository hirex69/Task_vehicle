// routes/vehicleRoutes.js

const express = require('express');
const router = express.Router();
const { updateVehicle, deleteVehicle } = require('../controller/updatedeletevehicle');

// PUT request to update a vehicle
router.put('/vehicles/:vehicleId', updateVehicle);

// DELETE request to delete a vehicle
router.delete('/vehicles/:vehicleId', deleteVehicle);

module.exports = router;
