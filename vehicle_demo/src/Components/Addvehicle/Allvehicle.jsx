import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addvehicle.css'

function Allvehicle() {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState('');
  const [scenarioVehicles, setScenarioVehicles] = useState([]);
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  const [editVehicleData, setEditVehicleData] = useState({
    vehicleId: '',
    name: '',
    initialPositionX: 0,
    initialPositionY: 0,
    speed: 0,
    direction: 'Towards',
  });

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
      const response = await axios.get(`http://localhost:5000/api/scenarios`);
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

  const handleEdit = (vehicleId) => {
    setEditingVehicleId(vehicleId);
    const selectedVehicle = scenarioVehicles.find(vehicle => vehicle._id === vehicleId);
    setEditVehicleData(selectedVehicle);
  };

  const handleDelete = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:5000/api/scenarios/vehicles/${vehicleId}`);
      fetchScenarioVehicles(selectedScenario);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditVehicleData({ ...editVehicleData, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/scenarios/vehicles/${editingVehicleId}`, editVehicleData);
      // Update the state with the edited data
      const updatedVehicles = scenarioVehicles.map(vehicle => {
        if (vehicle._id === editingVehicleId) {
          return editVehicleData;
        }
        return vehicle;
      });
      setScenarioVehicles(updatedVehicles);
      // Reset editing state
      setEditingVehicleId(null);
      setEditVehicleData({
        vehicleId: '',
        name: '',
        initialPositionX: 0,
        initialPositionY: 0,
        speed: 0,
        direction: 'Towards',
      });
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };
  const handleStart = () => {
    const containerWidth = 800; // Width of the container
    const containerHeight = 400; // Height of the container
  
    const updatedVehicles = scenarioVehicles.map(vehicle => {
      let newPositionX = vehicle.initialPositionX;
      let newPositionY = vehicle.initialPositionY;
  
      // Update position based on direction and speed
      switch (vehicle.direction) {
        case 'Towards':
          newPositionX += vehicle.speed;
          break;
        case 'Backwards':
          newPositionX -= vehicle.speed;
          break;
        case 'Upwards':
          newPositionY -= vehicle.speed;
          break;
        case 'Downwards':
          newPositionY += vehicle.speed;
          break;
        default:
          break;
      }
  
      // Ensure the new position is within the container boundaries
      newPositionX = Math.max(0, Math.min(newPositionX, containerWidth));
      newPositionY = Math.max(0, Math.min(newPositionY, containerHeight));
  
      return {
        ...vehicle,
        initialPositionX: newPositionX,
        initialPositionY: newPositionY
      };
    });
  
    setScenarioVehicles(updatedVehicles);
  };
  
  

  return (
    <div>
      <div className='labels'>
        <label>Select Scenario:</label>
        <select value={selectedScenario} onChange={handleScenarioChange} required>
          <option value="">Select Scenario</option>
          {scenarios.map((scenario) => (
            <option key={scenario._id} value={scenario.name}>{scenario.name}</option>
          ))}
        </select>
      </div>
     

      <table>
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Name</th>
            <th>Initial Position X</th>
            <th>Initial Position Y</th>
            <th>Speed</th>
            <th>Direction</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scenarioVehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{editingVehicleId === vehicle._id ? (
                <input type="text" name="vehicleId" value={editVehicleData.vehicleId} onChange={handleEditChange} />
              ) : (
                vehicle.vehicleId
              )}</td>
              <td>{editingVehicleId === vehicle._id ? (
                <input type="text" name="name" value={editVehicleData.name} onChange={handleEditChange} />
              ) : (
                vehicle.name
              )}</td>
              <td>{editingVehicleId === vehicle._id ? (
                <input type="number" name="initialPositionX" value={editVehicleData.initialPositionX} onChange={handleEditChange} />
              ) : (
                vehicle.initialPositionX
              )}</td>
              <td>{editingVehicleId === vehicle._id ? (
                <input type="number" name="initialPositionY" value={editVehicleData.initialPositionY} onChange={handleEditChange} />
              ) : (
                vehicle.initialPositionY
              )}</td>
              <td>{editingVehicleId === vehicle._id ? (
                <input type="number" name="speed" value={editVehicleData.speed} onChange={handleEditChange} />
              ) : (
                vehicle.speed
              )}</td>
              <td>{editingVehicleId === vehicle._id ? (
                <select name="direction" value={editVehicleData.direction} onChange={handleEditChange}>
                  <option value="Towards">Towards</option>
                  <option value="Backwards">Backwards</option>
                  <option value="Upwards">Upwards</option>
                  <option value="Downwards">Downwards</option>
                </select>
              ) : (
                vehicle.direction
              )}</td>
              <td>
                {editingVehicleId === vehicle._id ? (
                  <>
                  <div className='button-gap'>
                    <button type="button" onClick={handleSaveEdit}>Save</button>
                    <button type="button" onClick={() => setEditingVehicleId(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
               <td>    <img src='/edit.svg' onClick={() => handleEdit(vehicle._id)}               className="svg-icon small" 
/></td> 
               <td>  <img src='/delete.svg' onClick={() => handleDelete(vehicle._id)}               className="svg-icon small" 
 /> </td> 
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='start'>
      <button type="submit" onClick={handleStart}>Start Test</button>
      </div>

      <div style={{ position: 'relative', width: '830px', height: '430px', border: '1px solid black',   backgroundImage: 'linear-gradient(#888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)',  backgroundSize: '30px 30px'
 }}>
        {scenarioVehicles.map((vehicle) => (
           <div
           key={vehicle._id}
           style={{
             position: 'absolute',
             left: `${vehicle.initialPositionX}px`,
             top: `${vehicle.initialPositionY}px`,
             width: '30px',
             height: '30px',
             backgroundColor: 'blue', // Example color
             borderRadius: '50%',
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             color: 'white',
           }}
         >
           {vehicle.vehicleId}
         </div>
       ))}
      </div>
    </div>
  );
}

export default Allvehicle;
