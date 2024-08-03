const MySQL = require('mysql'); // Ensure you require 'mysql' or the appropriate MySQL package
const Config = require('../assets/json/config.json');

const sql = MySQL.createConnection({
    host: Config.hosting,
    user: Config.user,
    password: Config.password,
    database: Config.database,
    charset: 'utf8mb4' // In order to save emojis correctly
});

sql.connect((err) => {
    if (err) {
        // Stop the process if we can't connect to the MySQL server
        throw new Error('Impossible to connect to MySQL server. Code: ' + err.code);
    } else {
        console.log('[SQL] Connected to the MySQL server! Connection ID: ' + sql.threadId);
    }
});

module.exports = sql;
