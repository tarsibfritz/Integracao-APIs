import express from 'express';
import { criarGame, listarGames, obterGamePorId, editarGame, excluirGame } from '../controller/gameController.js';

const router = express.Router();

// Rotas
router.post('/games', criarGame);
router.get('/games', listarGames);
router.get('/games/:id', obterGamePorId);
router.put('/games/:id', editarGame);
router.delete('/games/:id', excluirGame);

export default router;