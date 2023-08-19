require("dotenv").config();

const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;



const sequelize = new Sequelize('countries', DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false
});


module.exports = {
    connection: sequelize
}