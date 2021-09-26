const mysql = require('mysql2');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'jw',
    password : '1111',
    database : 'sunstudy'
});
db.connect();

module.exports = db;