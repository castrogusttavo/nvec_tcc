const mysql = require('mysql2','mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_nvec',
<<<<<<< Updated upstream
    port: '3307'
=======
    port: 3306
>>>>>>> Stashed changes
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
});

const db_query = async (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = { connection, db_query };
