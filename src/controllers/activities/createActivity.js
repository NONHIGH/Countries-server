const Activity = require("../../database/models/Activity");
const Country = require('../../database/models/Country');

const createActivity = async (request, response) => {
    try {
        const { name, difficulty, duration, season, idsCountry } = request.body;
        if (!name || !difficulty || !duration || !season || !idsCountry) {
            return response.status(400).send({
                "error": "required data is missing"
            });
        }

        const created = await Activity.create({
            name, difficulty, duration, season
        });
        const countriesFound = await Country.findAll({
            where: {
                id: idsCountry
            }
        })
        await created.addCountries(countriesFound);
        return response.status(201).send({
            "success": "activity created"
        })
    } catch (error) {
        return response.status(500).send({
            "error": error.message
        })
    }
}

module.exports = createActivity;