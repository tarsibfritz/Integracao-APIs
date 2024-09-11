const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');

describe('API de Jogos', () => {
    let GameId;

    it('deve criar um novo jogo', async () => {
        const response = await request(app)
            .post('/api/games')
            .send({
                nome: 'Test Game',
                edicao: '1.0',
                preco: 20.00
            });

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('id');
        GameId = response.body.id;
    });

    it('deve recuperar o jogo criado', async () => {
        const response = await request(app)
            .get(`/api/games/${GameId}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('nome', 'Test Game');
    });

    it('deve atualizar o jogo', async () => {
        const response = await request(app)
            .put(`/api/games/${GameId}`)
            .send({
                nome: 'Updated Game',
                edicao: '1.1',
                preco: 25.00
            });

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('nome', 'Updated Game');
        expect(response.body).to.have.property('preco', 25.00);
    });

    it('deve deletar o jogo', async () => {
        const response = await request(app)
            .delete(`/api/games/${GameId}`);

        expect(response.status).to.equal(204);
    });

    it('deve listar todos os jogos', async () => {
        const response = await request(app)
            .get('/api/games');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    it('deve retornar 404 ao recuperar um jogo que não existe', async () => {
        const response = await request(app)
            .get(`/api/games/99999`);

        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('mensagem', 'Jogo com ID 99999 não encontrado');
    });

    it('deve retornar 404 ao atualizar um jogo que não existe', async () => {
        const response = await request(app)
            .put(`/api/games/99999`)
            .send({
                nome: 'Jogo Inexistente',
                edicao: '1.0',
                preco: 30.00
            });

        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('mensagem', 'Jogo com ID 99999 não encontrado');
    });

    it('deve retornar 404 ao deletar um jogo que não existe', async () => {
        const response = await request(app)
            .delete(`/api/games/99999`);

        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('mensagem', 'Jogo com ID 99999 não encontrado');
    });
});