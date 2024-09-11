export let games = [];

export class Game {
    constructor(id, nome, edicao, preco) {
        this.id = id;
        this.nome = nome;
        this.edicao = edicao;
        this.preco = preco;
    }
}