const Activity = require('../../database/models/Activity');
const Country = require('../../database/models/Country')
const CountryActivity = require('../../database/models/CountryActivity')
const axios = require('axios')

const getCountryById = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).send({
                "error": "The request must have an id"
            });
        }

        const countryFound = await Country.findByPk(id, {
            include: { model: Activity, through: CountryActivity }
        });

        if (!countryFound) {
            return response.status(400).send({
                "error": "The country does not exist"
            });
        }

        return response.status(200).send(countryFound);
    } catch (error) {
        return response.status(500).send({
            "error": error.message
        })
    }
}

module.exports = getCountryById;