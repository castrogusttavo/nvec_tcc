const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM tb_usuario WHERE email_usuario = ? AND senha_usuario = ?`;

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Erro no servidor');
    }

    if (result.length > 0) {
      // Usuário existe, enviar resposta de sucesso
      return res.status(200).send('Login bem-sucedido');
    } else {
      // Usuário não encontrado, enviar resposta de erro
      return res.status(401).send('Credenciais inválidas');
    }
  });
});

module.exports = router;