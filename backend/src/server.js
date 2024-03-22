const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

// Criando uma instância do express
const app = express();

// configurando o body-parser para analisar corpos de solicitações JSON
app.use(bodyParser.json());

/* Definindo um endpoint
    - req = request -> pedido ao servidor
    - res = response -> resposta do servidor
*/
app.get("/categorias", (req, res) => { 
  const sql = "SELECT * FROM tb_categoria";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar categorias:", err); 
      res.status(500).send("Erro ao buscar categorias"); 
      return;
    }
    res.json(results);
  });
});

// Defina uma rota para a raiz do servidor
app.get("/", (req, res) => {
    res.send("Servidor rodando!"); 
  });
  

// Configuração do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
