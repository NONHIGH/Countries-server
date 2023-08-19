const Country = require("../../database/models/Country");
const axios = require("axios");

const getAllCountries = async (request, response) => {
    try {

        let page = parseInt(request.query.page);
        if (!isNaN(page)) {

            if (page < 1) {
                page = 1;
            }
            if (page > 25) {
                throw new Error('This page number does not exist!')
            }
        }

        const limit = 10;
        const totalCountFromDB = await Country.count();

        if (!isNaN(page)) {
            const totalPages = Math.ceil(totalCountFromDB / limit);
            if (page > totalPages) {
                throw new Error('This page number does not exist');
            }
            const limited = await getCountriesLimited(page, limit);
            if (limited.length < 1) {
                const data = await getAllCountriesFromApi();
                return response.status(200).send(data);
            } else {
                return response
                    .status(200)
                    .send(
                        {
                            countries: limited,
                            limit,
                            page,
                            totalPages
                        }
                    )
            }
        }

        else {

            if (totalCountFromDB < 1) {
                const data = await getAllCountriesFromApi();
                return response.status(200).send(data);
            }
            const allCountries = await Country.findAll();

            return response.status(200).send(allCountries);
        }
    } catch (error) {
        return response.status(500).send({
            error: error.message,
        });
    }
};

const getCountriesLimited = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;

        const countriesFound = await Country.findAll({
            offset,
            limit,
        });
        return countriesFound;
    } catch (error) {
        throw new Error("Error when searching for countries in the database");
    }
};
const getAllCountriesFromApi = async () => {
    try {
        const { data } = await axios.get(`http://localhost:5500/countries`);
        data.map(async (country) => {
            return await Country.create({
                id: country.cca3,
                name: country.name?.official,
                flag: country.flags?.png,
                continent: country.continents ? country.continents : [country.region],
                capital: country.capital ? country.capital : [],
                subregion: country.subregion ? country.subregion : "",
                population: country.population,
                area: country.area,
            });
        });
        return data;
    } catch (error) {
        throw new Error('Someone has thing in the request');
    }
}
module.exports = getAllCountries;
