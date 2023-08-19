const express = require('express');
const activityRoute = express.Router();
const createActivity = require('../controllers/activities/createActivity')
const getActivities = require('../controllers/activities/getAllActivities')

activityRoute.get('/activities', getActivities)
activityRoute.post('/activities', createActivity)


module.exports = activityRoute;