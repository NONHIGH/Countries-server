const { DataTypes } = require('sequelize');
const { connection } = require('../db_connection');

const Country = connection.define('Country', {
    id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    flag: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    continent: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    capital: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    subregion: {
        type: DataTypes.STRING,
    },
    area: {
        type: DataTypes.DECIMAL,
    },
    population: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Country