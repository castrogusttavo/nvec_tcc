const express = require('express');
const bodyParser = require('body-parser');

// Criando uma instância do express
const app = express();

// configurando o body-parser para analisar corpos de solicitações JSON
app.use(bodyParser.json());

/* Definindo um endpoint
    - req = request -> pedido ao servidor
    - res = response -> resposta do servidor
*/
app.get('/', (req, res) => {
    res.send('Bem vindo ao backend do seu projeto!')
});

// Configuração do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;