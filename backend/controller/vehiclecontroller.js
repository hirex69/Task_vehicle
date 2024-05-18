const Vehicle = require('../model/vehicle');
const Scenario = require('../model/scenario'); // Import Scenario model

exports.addVehicleToScenario = async (req, res) => {
  try {
    const { scenarioName, vehicle } = req.body;

    // Find the scenario by name to get its ID
    const scenario = await Scenario.findOne({ name: scenarioName });

    if (!scenario) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

    // Create a new vehicle instance with scenario ID
    const newVehicle = new Vehicle({
        scenarioName: scenarioName, // Use the scenario ID
      ...vehicle, // Spread the vehicle object received in the request body
    });

    // Save the vehicle to the database
    await newVehicle.save();

    // Send a success response with the saved vehicle data
    res.status(201).json(newVehicle);
  } catch (error) {
    // Handle any errors and send an error response
    console.error('Error adding vehicle:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
