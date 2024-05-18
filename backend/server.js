const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const getScenariosRouter = require('./controller/getscenario');
const createScenarioRouter = require('./controller/createscenario');
const deleteScenarioRouter = require('./controller/deletescenario');
const updateScenarioRouter = require('./controller/updatescenario');
const vehicleRoutes = require('./route/addvehicleroute');
const getvehicleRoute = require('./route/getvehicle');
const updatedeletevehicle = require('./route/vehicledelteroute');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 5000; 
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/scenarios', getScenariosRouter);
app.use('/api/scenarios', createScenarioRouter);
app.use('/api/scenarios', deleteScenarioRouter);
app.use('/api/scenarios', updateScenarioRouter);
app.use('/api/scenarios', vehicleRoutes);
app.use('/api/scenarios', getvehicleRoute);
app.use('/api/scenarios', updatedeletevehicle);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
