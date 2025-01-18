let listaDeNumerosSorteados = []
let numeroLimite = 100
let numereSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// para evitar a repetição de código
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número de 1 a ${numeroLimite}`);
}

exibirMensagemInicial()

function verificarChute() {
    // extraindo o valor do input com .value
    let chute = document.querySelector('input').value;
    if (chute == numereSecreto){
        let mensagemTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${mensagemTentativa}!`);
        // Removendo o disabled para permitir o uso do botão Novo Jogo
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute > numereSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor que ' + chute);
        } else{
            exibirTextoNaTela('p', 'O número secreto é maior que ' + chute);
        }
        tentativas++;
        limparCampo();
    }
};

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
};

function reiniciarJogo(){
    exibirMensagemInicial();
    limparCampo();
    numereSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    // Reabilitando o disabled para trancar novamente o botão Novo Jogo depois que for utilizado
    document.getElementById('reiniciar').setAttribute('disabled', true)
};

function gerarNumeroAleatorio() {
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = []
    };
    // return parseInt(Math.random() * numeroLimite +1);
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1)
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        // retorna a função novamente executando os mesmos passos até terminar a condição
        return gerarNumeroAleatorio();
    } else {
        // item que empurra pra dentro ao final da lista
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}