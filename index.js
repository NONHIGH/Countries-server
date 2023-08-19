const app = require('./src/app');
const { connection } = require('./src/database/db_connection');
const PORT = 3001;
require('./src/database/models/Country')
require('./src/database/models/Activity')
require('./src/database/models/CountryActivity')


const main = async () => {
    try {
        await connection.sync({ force: false });
        app.listen(PORT, () => {
            ('Server listening on port ' + PORT);
        })
    } catch (error) {
        throw new Error("Something happened", error.message);
    }
}

main();