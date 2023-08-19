const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const countryRoutes = require('./routes/country.routes');
const activityRoutes = require('./routes/activity.routes');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api', countryRoutes)
app.use('/api', activityRoutes)


module.exports = app;