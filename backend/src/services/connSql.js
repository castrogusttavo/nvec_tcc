const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_tcc'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database');
});