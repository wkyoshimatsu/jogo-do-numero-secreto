let numeroMaximo = 3;
document.querySelector("input").setAttribute("max", numeroMaximo);
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);

    if (listaDeNumerosSorteados.length == numeroMaximo){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo - Adivinhe o número secreto");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroMaximo}`);
    console.log(numeroSecreto);
}

function verificarChute(){
    let chute = document.querySelector("input").value;
    let textoH1;
    let textoP;
    if (chute == numeroSecreto){
        textoH1 = "Acertou!";
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        textoP = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}.`;
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        tentativas++;
        let relacaoChuteNumeroSecreto = chute > numeroSecreto ? "menor" : "maior";
        textoH1 ="Errou!";
        textoP = "O número secreto é " + relacaoChuteNumeroSecreto + ".";
    }
    exibirTextoNaTela("h1", textoH1);
    exibirTextoNaTela("p", textoP);
    limparCampo();
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

exibirMensagemInicial();