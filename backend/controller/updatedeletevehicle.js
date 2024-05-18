
const Vehicle = require('../model/vehicle'); 

const updateVehicle = async (req, res) => {
   const { vehicleId } = req.params;
          try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    Object.assign(vehicle, req.body);
              await vehicle.save();
    res.json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteVehicle = async (req, res) => {
  const { vehicleId } = req.params;
  try {
    await Vehicle.findByIdAndDelete(vehicleId);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

                module.exports = { updateVehicle, deleteVehicle };
