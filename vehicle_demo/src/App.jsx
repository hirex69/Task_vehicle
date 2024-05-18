import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Router, Link,  Routes } from 'react-router-dom';

import './App.css';
import AddScenario from './Components/Addscenario/Addscenario';
import Addvehicle from './Components/Addvehicle/Addvehicle';
import Allvehicle from './Components/Addvehicle/Allvehicle';
function App() {

  return (
    <div>
    <BrowserRouter>
      <div className='container'>
        <div className="sidebar">
        <li><Link to="/">Home</Link></li>
          <ul>
            <li><Link to="/Addscenario">Add Scenario</Link></li>

            <li><Link to="/Addvehicle">Add Vehicle</Link></li>
            <li><Link to="/Allvehicle">All Vehicle</Link></li>

            {/* Add links to other routes if needed */}
          </ul>
        </div>

        <div className='content' >
          <Routes>
          <Route path="/" Component={AddScenario} />
            <Route path="/Addscenario" Component={AddScenario} />
            <Route path="/Addvehicle" Component={Addvehicle} />
            <Route path="/Allvehicle" Component={Allvehicle} />

            {/* Add routes for other components */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  </div>

  )}

export default App;
