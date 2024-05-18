import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './addscenario.css';

function AddScenario() {

  const [scenarios, setScenarios] = useState([]);

  const [scenario, setScenario] = useState({
    id: '',
    name: '',
    time: '',
  });
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [vehicleCounts, setVehicleCounts] = useState({});

  useEffect(() => {
    fetchScenarios();
  }, []);

  useEffect(() => {
    if (scenarios.length > 0) {
      fetchVehicleCounts();
    }
  }, [scenarios]);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/scenarios');
      setScenarios(response.data);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };


  const fetchVehicleCounts = async () => {
    try {
      const counts = {};
      await Promise.all(scenarios.map(async (scenario) => {
        const response = await axios.get(`http://localhost:5000/api/scenarios/${scenario.name}/vehicles`);
        counts[scenario._id] = response.data.length;
      }));
      setVehicleCounts(counts);
    } catch (error) {
      console.error('Error fetching vehicle counts:', error);
    }
  };

  const handleScenarioChange = (e) => {
    const { name, value } = e.target;
    setScenario({ ...scenario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scenario.name.trim()) {
      console.error('Scenario name cannot be empty');
      return;
    }   
  
    try {
      const response = await axios.post('http://localhost:5000/api/scenarios', scenario);
      console.log('Scenario created:', response.data);
      setScenarios([...scenarios, response.data]);
      setVehicleCounts({ ...vehicleCounts, [response.data._id]: 0 });
  
      // Clear input fields and reset state
      setScenario({ id: '', name: '', time: '' });
    } catch (error) {
      console.error('Error creating scenario:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/scenarios/${id}`);
      setScenarios(scenarios.filter((s) => s._id !== id));
      setSelectedScenario(null);
      setVehicleCounts((prevCounts) => {
        const updatedCounts = { ...prevCounts };
        delete updatedCounts[id];
        return updatedCounts;
      });
    } catch (error) {
      console.error('Error deleting scenario:', error);
    }
  };

  const handleEdit = (s) => {
    setSelectedScenario(s);
    setScenario({ id: s.id, name: s.name, time: s.time });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/scenarios/${selectedScenario._id}`, scenario);
      console.log('Scenario updated:', response.data);
      setScenarios(scenarios.map((s) => (s._id === response.data._id ? response.data : s)));
      setSelectedScenario(null);
    } catch (error) {
      console.error('Error updating scenario:', error);
    }
  };  

  return (
    <div>
      
      <h2>Create Scenario</h2>
      <form onSubmit={handleSubmit} className="scenario-form">
        <div className="form-group">
          <label>Scenario ID:</label>
          <input
            type="text"
            name="id"
            value={scenario.id}
            onChange={handleScenarioChange}
            pattern="[0-9]*"
            title="ID must contain only numbers"
            required
          />
        </div>
        <div className="form-group">
          <label>Scenario Name:</label>
          <input
            type="text"
            name="name"
            value={scenario.name}
            onChange={handleScenarioChange}
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="text"
            name="time"
            value={scenario.time}
            onChange={handleScenarioChange}
            required
          />
        </div>
        {selectedScenario ? (
          <div>
    <div className="button-gap">

            <button type="button" onClick={handleUpdate}>Update Scenario</button>
            </div>

            <div className="button-gap">

            <button type="button" onClick={() => setSelectedScenario(null)}>Cancel</button>
          </div>
          </div>

        ) : (
          <div className='submit'>
          <button type="submit">Create Scenario</button>
          </div>
        )}
      </form>

      <h2>All Scenarios:</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Time</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Number Of Vehicle</th>

            <th>Add Vehicle</th>


          </tr>
        </thead>
        <tbody>
          {scenarios.map((s) => (
            <tr key={s._id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.time}</td>
              <td>
                
                <img 
    src="edit.svg" 
    alt="Edit" 
    onClick={() => handleEdit(s)}
    className="svg-icon small" 
  />            </td>

                <td>
                <img 
              
              src="delete.svg" 
              alt="Delete" 
              onClick={() => handleDelete(s._id)}
              className="svg-icon small" 
            />      

              </td>
                       <td>{vehicleCounts[s._id]}</td>

              <td>
              <Link to="/Addvehicle">
        <img 
          src="plus.svg" 
          alt="Add" 
          className="svg-icon small" 
        />
      </Link>    </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default AddScenario;
