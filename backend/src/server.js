/* Definindo um endpoint
    - req = request -> pedido ao servidor
    - res = response -> resposta do servidor
*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./frameworks/db/db");
const jwt = require('jsonwebtoken');

const secretKey = 'PdZdx2PAMRbRQALIPfxiw1PlPenTPfjtP2rqvZDmQfjTGZTJSNZDx05PwZTHP2bsPgjAM1TlHPTQPXU9CqMqk2CNZEoEDNYVCskvj1CyCraGCswgC2ediMQzDswGTMGWFAMQk05CjMGUC2ofCtwNZ1GyUCGDCKH9';

// Importando os arquivos de rota das APIs
const communitiesRouter = require("./api/communities/communities");
const listsCommunitiesRouter = require("./api/communities/listsCommunities");

const itemsRouter = require("./api/items/items");
const listsRouter = require("./api/lists/lists"); 

const reportRouter = require("./api/report/report");
const categoryRouter = require("./api/categories/categories");
const usersRouter = require("./api/users/users")(secretKey);

const networkErrorRouter = require("./api/system/ping");
const app = express();

app.use(cors({
  origin: 'http://localhost:8100',
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

// Configurando as rotas da API para os respectivos caminhos
app.use('/api', communitiesRouter); 
app.use('/api', itemsRouter); 
app.use('/api', listsRouter); 
app.use('/api', usersRouter);
app.use('/api', networkErrorRouter);
app.use('/api', reportRouter);
app.use('/api', listsCommunitiesRouter)
app.use('/api', categoryRouter)

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
