import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import gameRoutes from './routes/gameRoutes.js';

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

module.exports = app; 