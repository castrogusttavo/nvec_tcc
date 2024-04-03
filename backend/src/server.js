const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const axios = require("axios");

// Importando os arquivos de rota das APIs
const addressesRouter = require("./api/addresses/addresses");
const communitiesRouter = require("./api/communities/communities");
const fixedExpensesRouter = require("./api/fixedExpenses/fixedExpenses");
const incomeRouter = require("./api/income/income");
const itemsRouter = require("./api/items/items");
const listsRouter = require("./api/lists/lists");
const usersRouter = require("./api/users/users");

const app = express();

// Configurando o middleware body-parser para analisar corpos de solicitação JSON
app.use(bodyParser.json());

// Configurando as rotas da API para os respectivos caminhos
app.use('/api/addresses', addressesRouter);
app.use('/api/communities', communitiesRouter);
app.use('/api/fixedExpenses', fixedExpensesRouter);
app.use('/api/income', incomeRouter);
app.use('/api/items', itemsRouter);
app.use('/api/lists', listsRouter);
app.use('/api/users', usersRouter);

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
