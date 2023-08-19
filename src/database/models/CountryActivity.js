const Activity = require('./Activity');
const Country = require('./Country');
const { connection } = require('../db_connection');

const CountryActivity = connection.define('CountryActivity', {
}, { timestamps: false })
Country.belongsToMany(Activity, { through: CountryActivity });
Activity.belongsToMany(Country, { through: CountryActivity });

module.exports = CountryActivity;