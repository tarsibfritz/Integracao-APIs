const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController');

// Rotas
router.post('/games', gameController.criarGame);
router.get('/games', gameController.listarGames);
router.get('/games/:id', gameController.obterGamePorId);
router.put('/games/:id', gameController.editarGame);
router.delete('/games/:id', gameController.excluirGame);

module.exports = router;