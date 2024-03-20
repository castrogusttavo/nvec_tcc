const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_tcc'
});

connection.connect();

app.use(bodyParser.json());

app.post('/api/cadastrar', (req, res) => {
    const { nome, email, senha } = req.body;   

    const sql = 'INSERT INTO tb_usuario (nome, email, senha) VALUES (?, ?, ?)';
    connection.query(sql, [nome, email, senha], (error, results) => {
        if(error){
            console.error('Erro ao cadastrar:' , error);
            res.status(500).json({message: 'Erro ao cadastrar'});
            return;
        }   
        console.log('Usuário cadastrado com sucesso');
        res.json({message: 'Usuário cadastrado com sucesso'});
    });
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});