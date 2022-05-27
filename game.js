// 1. iniciar o jogo com o pressionar de uma tecla
// 3. ao iniciar o jogo, fazer o computador escolher um botão aleatório e gerar o som correspondente à cor do botão
// 4. pôr o event click à escuta para o botão que o jogador selecionar
// 5. se o botão selecionado for o mesmo que o computador, subir o nº do nível, mostrar o primeiro botão e adicionar mais um botão aleatório
// 6. caso o jogador selecione um botão errado, gerar o som de errado e terminar o jogo

// em vez de mostrar a sequência, está a mostrar a array toda ao mesmo tempo
// o eventListener de click permanece, mesmo que não seja a vez do jogador inserir a sua jogada
// não está a esvaziar a array do computador

const info = document.querySelector('h1');
const botoes = document.querySelectorAll('.btn');
var computador = [];
var jogador = [];
var numNivel = 1;

document.addEventListener('keydown', e => proxJogada()); // executa a função ao detetar o pressionar de uma tecla

function proxJogada() {
    info.innerHTML = `Level ${numNivel}`; // para mostrar o nível
    const jogada = botoes[Math.floor(Math.random() * botoes.length)]; // gera uma cor aleatória e associa-a à variável jogada
    computador.push(jogada.id); // adiciona o id à array do computador
    animacao(jogada.id);
    som(jogada.id);
};

function som(cor) {
    switch(cor) {
        case 'green':
            var audio = new Audio('sounds/green.mp3');
            break;
        case 'red':
            var audio = new Audio('sounds/red.mp3');
            break;
        case 'yellow':
            var audio = new Audio('sounds/yellow.mp3');
            break;
        case 'blue':
            var audio = new Audio('sounds/blue.mp3');
            break;      
    }
    audio.play();
};

function animacao(cor) { // animação do botão ao ser clicado
    const botaoAtivo = document.querySelector('#'+cor); // encontra o id com a cor
    botaoAtivo.style.visibility = "hidden"; // quando o botao é clicado, torna-se invisivel
    setTimeout( () => {
        botaoAtivo.style.visibility = "visible"; // ao fim de 1seg, volta a ser visivel
    },200);
};

// não se coloca numa função, ele adiciona logo este parâmetro ao abrir a página, para não repetir o eventListener
botoes.forEach( botao => { // para cada botao
    botao.addEventListener("click", e => { // fica à escuta para o clique
        var botaoJogador = e.target.id; // a variável assume o id do botão a ser clicado
        som(botaoJogador); // executa a função do som
        animacao(botaoJogador); // executa a animação
        jogador.push(botaoJogador); // adiciona o botão à array do jogador
        verificarInput(jogador.length-1); // passa o valor que está em cada index na array do johgador
    });    
});

function verificarInput(sequencia) {
    if (jogador[sequencia] === computador[sequencia]) { // caso o botão clicado no index corresponda ao mesmo no mesmo index do computador
        if (computador.length === jogador.length) { // caso tenha percorrido a array de ambas
            numNivel++; // adiciona um nível
            jogador = []; // esvazia a array do jogador para o próximo nível
            setTimeout( () => {
                proxJogada();
            }, 1000);
        }
    } else {
        fimDoJogo();
    }
}

function fimDoJogo() {
    info.innerHTML = `Game Over`;
    var errorSound = new Audio('sounds/wrong.mp3');
    errorSound.play();    
    numNivel = 1;
    computador = [];
    jogador = [];
}