import { games, Game } from '../models/gameModel.js';

// Criar um novo jogo
export const criarGame = (req, res) => {
    const { nome, edicao, preco } = req.body;
    const novoId = games.length > 0 ? Math.max(...games.map(game => game.id)) + 1 : 1;
    const novoGame = new Game(novoId, nome, edicao, preco);
    games.push(novoGame);
    res.status(201).json(novoGame);
};

// Listar todos os jogos
export const listarGames = (req, res) => {
    res.status(200).json(games);
};

// Listar jogo selecionado
export const obterGamePorId = (req, res) => {
    const { id } = req.params;
    const game = games.find(game => game.id === parseInt(id));
    
    if (game) {
        res.status(200).json(game);
    } else {
        res.status(404).json({ mensagem: `Jogo com ID ${id} não encontrado` });
    }
};

// Editar um jogo existente
export const editarGame = (req, res) => {
    const { id } = req.params;
    const { nome, edicao, preco } = req.body;
    const game = games.find(game => game.id === parseInt(id));

    if (game) {
        game.nome = nome;
        game.edicao = edicao;
        game.preco = parseFloat(preco); // Converter o preço para número
        console.log('Jogo atualizado:', game); // Log para verificar atualização
        res.status(200).json(game);
    } else {
        res.status(404).json({ mensagem: `Jogo com ID ${id} não encontrado` });
    }
};

// Excluir um jogo
export const excluirGame = (req, res) => {
    const { id } = req.params;
    const index = games.findIndex(game => game.id === parseInt(id));
  
    if (index !== -1) {
      games.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ mensagem: `Jogo com ID ${id} não encontrado` });
    }
};