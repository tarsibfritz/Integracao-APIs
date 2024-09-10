const API_URL = 'http://localhost:3000/api/games';

// Carregar todos os jogos quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    carregarJogos();
    
    // Definir a variável form após o carregamento do DOM
    const form = document.getElementById('gameForm');
    
    // Adicionar jogo ou atualizar jogo existente
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = document.getElementById('gameId').value; // Obtém o ID do campo oculto
        const nome = document.getElementById('nome').value;
        const edicao = document.getElementById('edicao').value;
        const preco = document.getElementById('preco').value;

        const jogo = { nome, edicao, preco };

        try {
            let response;
            if (id) {
                // Atualizar jogo existente
                response = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jogo)
                });
            } else {
                // Criar novo jogo
                response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jogo)
                });
            }

            const game = await response.json();
            document.querySelector(`#gamesTable tbody`).innerHTML = ''; // Limpa a tabela
            carregarJogos();  // Recarregar a tabela após a operação
            form.reset(); // Limpa o formulário
        } catch (error) {
            console.error('Erro ao salvar jogo:', error);
        }
    });
});

// Carregar e listar jogos
async function carregarJogos() {
    try {
        const response = await fetch(API_URL);
        const games = await response.json();
        games.forEach(adicionarJogoNaTabela);
    } catch (error) {
        console.error('Erro ao carregar jogos:', error);
    }
}

// Adicionar um jogo na tabela
function adicionarJogoNaTabela(game) {
    const tableBody = document.querySelector('#gamesTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${game.id}</td>
        <td>${game.nome}</td>
        <td>${game.edicao}</td>
        <td>R$ ${parseFloat(game.preco).toFixed(2)}</td>
        <td>
            <button class="delete" onclick="excluirJogo(${game.id})">Excluir</button>
        </td>
        <td>
            <button class="edit" onclick="editarJogo(${game.id})">Editar</button>
        </td>
    `;

    tableBody.appendChild(row);
}

async function editarJogo(id) {
    const confirmEdit = confirm(`Você deseja editar o jogo de ID: ${id}?`);

    if (!confirmEdit) {
        return;
    }

    const novoNome = prompt("Digite o novo nome do jogo:");
    const novaEdicao = prompt("Digite a nova edição do jogo:");
    const novoPreco = prompt("Digite o novo preço do jogo:");

    if (novoNome === null || novaEdicao === null || novoPreco === null) {
        console.error("Edição cancelada pelo usuário.");
        return;
    }

    if (isNaN(novoPreco) || parseFloat(novoPreco) < 0) {
        console.error("Preço inválido.");
        return;
    }

    const jogoAtualizado = { nome: novoNome, edicao: novaEdicao, preco: parseFloat(novoPreco) };

    try {
        console.log("Enviando dados para o backend:", jogoAtualizado);

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jogoAtualizado)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Erro ao atualizar jogo: ${response.statusText}`, errorText);
            return;
        }

        const game = await response.json();
        console.log("Jogo atualizado:", game);

        document.querySelector(`#gamesTable tbody`).innerHTML = '';
        carregarJogos();
    } catch (error) {
        console.error(error);
    }
}

// Excluir um jogo
async function excluirJogo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 204) {
            document.querySelector(`#gamesTable tbody`).innerHTML = '';
            carregarJogos();  // Recarregar a tabela após excluir
        } else {
            console.error('Erro ao excluir jogo:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao excluir jogo:', error);
    }
}