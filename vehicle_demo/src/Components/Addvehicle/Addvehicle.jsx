import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addvehicle.css';
function Addvehicle() {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState('');
  const [vehicle, setVehicle] = useState({
    vehicleId: '',
    name: '',
    initialPositionX: 0,
    initialPositionY: 0,
    speed: 0,
    direction: 'Towards',
  });
  const [scenarioVehicles, setScenarioVehicles] = useState([]);
  const [addedMessage, setAddedMessage] = useState('');

  useEffect(() => {
    fetchScenarios();
  }, []);

  useEffect(() => {
    if (selectedScenario) {
      fetchScenarioVehicles(selectedScenario);
    }
  }, [selectedScenario]);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/scenarios');
      console.log('Fetched scenarios:', response.data);
      setScenarios(response.data);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };

  const fetchScenarioVehicles = async (scenarioName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/scenarios/${scenarioName}/vehicles`);
      setScenarioVehicles(response.data);
    } catch (error) {
      console.error('Error fetching scenario vehicles:', error);
    }
  };

  const handleScenarioChange = (e) => {
    setSelectedScenario(e.target.value);
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d+$/.test(vehicle.vehicleId) || parseInt(vehicle.vehicleId) > 99) {
      setAddedMessage('Vehicle ID should be a number not greater than 99.');
      return;
    }
    if (vehicle.initialPositionX < 0 || vehicle.initialPositionX > 800) {
      setAddedMessage('Initial Position X should be between 0 and 800.');
      return;
    }
    if (vehicle.initialPositionY < 0 || vehicle.initialPositionY > 400) {
      setAddedMessage('Initial Position Y should be between 0 and 400.');
      return;
    }
    try {
      const requestData = {
        scenarioName: selectedScenario,
        vehicle: vehicle,
      };
      const response = await axios.post(`http://localhost:5000/api/scenarios/vehicles`, requestData);
      console.log('Vehicle added:', response.data);
      setAddedMessage('Vehicle added successfully!');
      setVehicle({
        vehicleId: '',
        name: '',
        initialPositionX: 0,
        initialPositionY: 0,
        speed: 0,
        direction: 'Towards',
      });
      fetchScenarioVehicles(selectedScenario); // Refresh scenario vehicles after adding a new one
    } catch (error) {
      console.error('Error adding vehicle:', error);
      setAddedMessage('Failed to add vehicle.');
    }
  };
  
  return (
    <div>
      <h2>Add Vehicle</h2>
      {addedMessage && <p>{addedMessage}</p>}
      <div className='label'>
        <label>Select Scenario:</label>
        <select value={selectedScenario} onChange={handleScenarioChange} required>
          <option value="">Select Scenario</option>
          {scenarios.map((scenario) => (
            <option key={scenario._id} value={scenario.name}>{scenario.name}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="form-groups">
          <label>Vehicle ID:</label>
          <input
            type="text"
            name="vehicleId"
            value={vehicle.vehicleId}
            onChange={handleVehicleChange}
            required
          />
        </div>
        <div className="form-groups">
          <label>Vehicle Name:</label>
          <input
            type="text"
            name="name"
            value={vehicle.name}
            onChange={handleVehicleChange}
            required
          />
        </div>

<div className="form-groups">
  <label>Initial Position X:</label>
  <input
    type="number"
    name="initialPositionX"
    value={vehicle.initialPositionX}
    onChange={handleVehicleChange}
    required
  />
  {(vehicle.initialPositionX >= 0 && vehicle.initialPositionX <= 800) ? null : (
    <p style={{ color: 'red' }}>Initial Position X should be between 0 and 800.</p>
  )}
</div>
<div className="form-groups">
  <label>Initial Position Y:</label>
  <input
    type="number"
    name="initialPositionY"
    value={vehicle.initialPositionY}
    onChange={handleVehicleChange}
    required
  />
  {(vehicle.initialPositionY >= 0 && vehicle.initialPositionY <= 400) ? null : (
    <p style={{ color: 'red' }}>Initial Position Y should be between 0 and 400.</p>
  )}
</div>
<div className="form-groups">
  <label>Speed:</label>
  <input
    type="number"
    name="speed"
    value={vehicle.speed}
    onChange={handleVehicleChange}
    required
  />
  {(vehicle.speed >= 0 && vehicle.speed <= 60) ? null : (
    <p style={{ color: 'red' }}>Speed should be between 0 and 80.</p>
  )}
</div>

        <div className="form-groups">
          <label>Direction:</label>
          <select name="direction" value={vehicle.direction} onChange={handleVehicleChange} required>
            <option value="Towards">Towards</option>
            <option value="Backwards">Backwards</option>
            <option value="Upwards">Upwards</option>
            <option value="Downwards">Downwards</option>
          </select>
        </div>      
        <div className='vehicle'>
          <button type="submit">Add Vehicle</button>
          </div>
      </form>
     
         </div>
  );
}

export default Addvehicle;
