/* Definindo um endpoint
    - req = request -> pedido ao servidor
    - res = response -> resposta do servidor
*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./frameworks/db/db");
const session = require("express-session")

// Importando os arquivos de rota das APIs
const addressesRouter = require("./api/addresses/addresses");
const communitiesRouter = require("./api/communities/communities");
const fixedExpensesRouter = require("./api/fixedExpenses/fixedExpenses");
const incomeRouter = require("./api/income/income");
const itemsRouter = require("./api/items/items");
const listsRouter = require("./api/lists/lists");
const usersRouter = require("./api/users/users");
const categoriesRouter = require("./api/categories/categories");
const router = express.Router();
const app = express();

app.use(
  session({
    secret: 'VjFjd2VGSXhXWGROVldoc1VrVktZVlpzV2xwbFJsWlpZMFZPYTFJd05VcFZNV2hyVmpGS1ZrNVZWVDA9IwSwq2ITFKuKJTEBIyqbp1IeIxgMIycmI2kjoSWfJycMZSMCLGSWq05IpSMAI2ulIzcTF1MeAIMJIQN9',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false,
      maxAge: 7200000,
    },
  })
);

app.use(cors({
  origin: 'http://localhost:8100'
}));
app.use(express.json());
app.use(bodyParser.json());

// Configurando as rotas da API para os respectivos caminhos
app.use('/api', addressesRouter);
app.use('/api', communitiesRouter);
app.use('/api', fixedExpensesRouter);
app.use('/api', incomeRouter);
app.use('/api', itemsRouter);
app.use('/api', listsRouter);
app.use('/api', usersRouter);
app.use('/api', categoriesRouter);

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
