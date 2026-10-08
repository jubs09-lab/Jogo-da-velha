const casas = document.querySelectorAll(".casa");
const mensagem = document.getElementById("mensagem");
const reiniciar = document.getElementById("reiniciar");

let jogadorAtual = "X";
let tabuleiro = ["", "", "", "", "", "", "", ""];
let jogoAtivo = true;

const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function jogar(event) {
    const indice = event.target.dataset.index;

    if (tabuleiro[indice] !== "" || !jogoAtivo) {
        return;
    }

    tabuleiro[indice] = jogadorAtual;
    event.target.textContent = jogadorAtual;

    verificarVencedor();
}

function verificarVencedor() {
    for (let combinacao of combinacoes) {
        const [a, b, c] = combinacao;

        if (
            tabuleiro[a] !== "" &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {
            mensagem.textContent = `Jogador ${jogadorAtual} venceu!`;
            jogoAtivo = false;
            return;
        }
    }

    if (!tabuleiro.includes("")) {
        mensagem.textContent = "Empate!";
        jogoAtivo = false;
        return;
    }

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    mensagem.textContent = `Vez do jogador ${jogadorAtual}`;
}

function reiniciarJogo() {
    jogadorAtual = "X";
    tabuleiro = ["", "", "", "", "", "", "", ""];
    jogoAtivo = true;

    casas.forEach(casa => {
        casa.textContent = "";
    });

    mensagem.textContent = "Vez do jogador X";
}

casas.forEach(casa => {
    casa.addEventListener("click", jogar);
});

reiniciar.addEventListener("click", reiniciarJogo);
