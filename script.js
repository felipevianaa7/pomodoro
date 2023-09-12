const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/snowfall.mp3');
const playMusica = new Audio('./sons/play.wav');
const pauseMusica = new Audio('./sons/pause.mp3');
const beepMusica = new Audio('./sons/beep.mp3');
const tempoNaTela = document.querySelector('#timer');
const startPauseBt = document.querySelector('#start-pause');
const resetBt = document.querySelector('#reset');
const scanTag = document.querySelector('span');
const iconBt = document.querySelector(".app__card-primary-butto-icon");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null; 

musica.loop = true;
musica.currentTime = 8;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beepMusica.play();
        zerar();
        alert('Tempo finalizado!');
        return; 
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

resetBt.addEventListener('click', () => {
    botoes.forEach(contexto => {
        if (contexto.classList.contains('active')) {
            console.log(contexto);
            const valor = contexto.getAttribute('data-contexto');            

            if (valor == 'foco') {
                zerar();
                tempoDecorridoEmSegundos = 1500;
                mostrarTempo();
            } else if (valor == 'short') {
                zerar();
                tempoDecorridoEmSegundos = 300;
                mostrarTempo();
            } else if (valor == 'long') {
                zerar();
                tempoDecorridoEmSegundos = 900;
                mostrarTempo();
            }
        }
    });
});

function iniciarOuPausar() {
    if (intervaloId) {
        pauseMusica.play();
        zerar();
        return; 
    }
    playMusica.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    scanTag.innerHTML = "Pausar";
    iconBt.setAttribute('src', `./imagens/pause.png`);

}

function zerar() {
    clearInterval(intervaloId);
    scanTag.innerHTML = "Começar";
    iconBt.setAttribute('src', `./imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
