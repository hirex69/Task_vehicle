// controllers/scenarioController.js

const Scenario = require('../model/scenario');
const Vehicle = require('../model/vehicle');

// Controller function to fetch vehicles based on scenario name
exports.getVehiclesByScenarioName = async (req, res) => {
  try {
    const scenarioName = req.params.scenarioName;
    // Find the scenario by name to get its ID
    const scenario = await Scenario.findOne({ name: scenarioName });
    if (!scenario) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

    // Fetch vehicles based on the scenario ID
    const vehicles = await Vehicle.find({ scenarioName: scenarioName  });
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching scenario vehicles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
