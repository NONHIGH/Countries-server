const Country = require('../../database/models/Country');
const { Op } = require('sequelize');

const getCountriesMatchingName = async (request, response) => {
    try {
        const { name } = request.query;

        if (name.length >= 3) {
            const countriesFounds = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            });

            return response.status(200).send(countriesFounds);
        } else {
            return response.status(400).send({
                "error": "Name should have at least 3 characters"
            });
        }

    } catch (error) {
        return response.status(500).send({
            "error": error.message
        });
    }
}

module.exports = getCountriesMatchingName;
