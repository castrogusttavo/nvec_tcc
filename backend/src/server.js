const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

// Importando o arquivo de rotas das APIs
const userRouter = require("./api/users/users");
app.use('/api', userRouter); 

const app = express();
app.use(bodyParser.json());

/* Definindo um endpoint
    - req = request -> pedido ao servidor
    - res = response -> resposta do servidor
*/
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

// Configuração do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
