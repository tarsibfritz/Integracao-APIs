const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

// Middleware de segurança
app.use(helmet());
// Middleware para habilitar o CORS
app.use(cors());
// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Uso das rotas da aplicação
app.use('/api', gameRoutes);

app.get('/', (req, res) => {
    res.send('API de Jogos está rodando!');
});

// Inicializador do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});