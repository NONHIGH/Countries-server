const Activity = require('../../database/models/Activity');

const getAllActivities = async (request, response) => {
    try {
        const allActivities = await Activity.findAll();
        return response.status(200).send(allActivities)

    } catch (error) {
        return response.status(500).send({
            "error": error.message
        })
    }
}

module.exports = getAllActivities;