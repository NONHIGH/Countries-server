const express = require('express');
const countryRoute = express.Router();
const getAllCountries = require('../controllers/countries/getAllCountries');
const getCountryById = require('../controllers/countries/getCountryById');
const getCountriesMatchingName = require('../controllers/countries/getCountriesByName');

countryRoute.get('/countries', (request, response) => {
    if (request.query.name) {

        getCountriesMatchingName(request, response);
    } else {

        getAllCountries(request, response)
    }
    return
})
countryRoute.get('/countries/:id', getCountryById)

module.exports = countryRoute;