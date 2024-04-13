const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

// Importando os arquivos de rota das APIs
const addressesRouter = require("./api/addresses/addresses");
const communitiesRouter = require("./api/communities/communities");
const fixedExpensesRouter = require("./api/fixedExpenses/fixedExpenses");
const incomeRouter = require("./api/income/income");
const itemsRouter = require("./api/items/items");
const listsRouter = require("./api/lists/lists");
const usersRouter = require("./api/users/users");

const app = express();

app.use(cors({
  origin: 'http://localhost:8100'
}));

app.use(bodyParser.json());

// Configurando as rotas da API para os respectivos caminhos
app.use('/api', addressesRouter);
app.use('/api', communitiesRouter);
app.use('/api', fixedExpensesRouter);
app.use('/api', incomeRouter);
app.use('/api', itemsRouter);
app.use('/api', listsRouter);
app.use('/api', usersRouter);

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
