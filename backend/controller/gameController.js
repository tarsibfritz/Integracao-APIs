// gameController.js
const games = require('../data/gameData');
const Game = require('../models/gameModel');

// Criar um novo jogo
exports.criarGame = (req, res) => {
    const { nome, edicao, preco } = req.body;
    const novoGame = new Game(games.length + 1, nome, edicao, preco);
    games.push(novoGame);
    res.status(201).json(novoGame);
};

// Listar todos os jogos
exports.listarGames = (req, res) => {
    res.status(200).json(games);
};

// Atualizar um jogo
exports.atualizarGame = (req, res) => {
    const { id } = req.params;
    const { nome, edicao, preco } = req.body;
    const game = games.find(game => game.id === parseInt(id));

    if (game) {
        game.nome = nome;
        game.edicao = edicao;
        game.preco = preco;
        res.status(200).json(game);
    } else {
        res.status(404).json({ mensagem: 'Jogo não encontrado' });
    }
};

// Excluir um jogo
exports.excluirGame = (req, res) => {
    const { id } = req.params;
    const index = games.findIndex(game => game.id === parseInt(id));
  
    if (index !== -1) {
      games.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ mensagem: 'Jogo não encontrado' });
    }
};