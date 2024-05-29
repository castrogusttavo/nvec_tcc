/* Definindo um endpoint
    - req = request -> pedido ao servidor
    - res = response -> resposta do servidor
*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./frameworks/db/db");
const jwt = require('jsonwebtoken');

const secretKey = "VjFjd2VGSXhXWGROVldoc1VrVktZVlpzV2xwbFJsWlpZMFZPYTFJd05VcFZNV2hyVmpGS1ZrNVZWVDA9IwSwq2ITFKuKJTEBIyqbp1IeIxgMIycmI2kjoSWfJycMZSMCLGSWq05IpSMAI2ulIzcTF1MeAIMJIQN9";

// Importando os arquivos de rota das APIs
const addressesRouter = require("./api/addresses/addresses");
const communitiesRouter = require("./api/communities/communities");
const fixedExpensesRouter = require("./api/fixedExpenses/fixedExpenses");
const incomeRouter = require("./api/income/income");
const itemsRouter = require("./api/items/items");
const listsRouter = require("./api/lists/lists");
const usersRouter = require("./api/users/users")(secretKey);
const categoriesRouter = require("./api/categories/categories");
const measuresRouter = require("./api/measures/measures");
const statusRouter = require("./api/status/status");
const dataUserRouter = require("./api/users/dataUser");
const reportRouter = require("./api/report/report");

const checkInternetRouter = require("./api/system/ping");
const cacheRouter = require("./api/system/cache")(secretKey);
const app = express();

app.use(cors({
  origin: 'http://localhost:8100'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurando as rotas da API para os respectivos caminhos

  // Rotas e Dados do usuário
app.use('/api', addressesRouter);
app.use('/api', communitiesRouter);
app.use('/api', fixedExpensesRouter);
app.use('/api', incomeRouter);
app.use('/api', itemsRouter);
app.use('/api', listsRouter);
app.use('/api', usersRouter);
app.use('/api', categoriesRouter);
app.use('/api', measuresRouter);
app.use('/api', statusRouter);
app.use('/api', dataUserRouter);
app.use('/api', reportRouter);

  // Rotas e Dados do sistema
app.use('/api', checkInternetRouter);
app.use('/api', cacheRouter);

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  res.send(`Você visitou esta página ${req.session.views} vezes`);
});

// Configuração do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
