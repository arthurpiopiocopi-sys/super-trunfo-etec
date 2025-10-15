// ====== CARTAS ======
var cartas = [
  { nome:"Pica Pau", imagem:"imagens/picapau.jpg", forca:7, velocidade:9, inteligencia:6, popularidade:9 },
  { nome:"Pantera Cor de Rosa", imagem:"imagens/pantera.jpg", forca:5, velocidade:8, inteligencia:9, popularidade:8 },
  { nome:"Perna Longa", imagem:"imagens/pernalonga.jpg", forca:4, velocidade:6, inteligencia:8, popularidade:6 },
  { nome:"Ben 10", imagem:"imagens/ben10.jpg", forca:9, velocidade:7, inteligencia:8, popularidade:8 },
  { nome:"Mestre dos Magos", imagem:"imagens/mago.jpg", forca:6, velocidade:5, inteligencia:10, popularidade:7 },
  { nome:"Lion Thunder Cats", imagem:"imagens/lion.jpg", forca:10, velocidade:8, inteligencia:7, popularidade:8 },
  { nome:"Capitão Caverna", imagem:"imagens/capcaverna.jpg", forca:10, velocidade:4, inteligencia:3, popularidade:7 },
  { nome:"Seiya Cavaleiros do Zodíaco", imagem:"imagens/seiya.jpg", forca:9, velocidade:9, inteligencia:7, popularidade:9 },
  { nome:"Três Espiãs Demais", imagem:"imagens/espias.jpg", forca:6, velocidade:8, inteligencia:8, popularidade:7 },
  { nome:"Johnny Bravo", imagem:"imagens/jhonny.jpg", forca:8, velocidade:5, inteligencia:3, popularidade:7 },
  { nome:"Padrinhos Mágicos", imagem:"imagens/padrinhos.jpg", forca:3, velocidade:6, inteligencia:7, popularidade:8 },
  { nome:"O Máscara", imagem:"imagens/mascara.jpg", forca:9, velocidade:8, inteligencia:6, popularidade:8 },
  { nome:"Coragem o Cão Covarde", imagem:"imagens/coragem.jpg", forca:4, velocidade:7, inteligencia:6, popularidade:8 },
  { nome:"Tom e Jerry", imagem:"imagens/tom.jpg", forca:5, velocidade:10, inteligencia:8, popularidade:10 },
  { nome:"Popeye", imagem:"imagens/popey.jpg", forca:10, velocidade:6, inteligencia:5, popularidade:9 },
  { nome:"Zé Carioca", imagem:"imagens/zecarioca.jpg", forca:3, velocidade:7, inteligencia:7, popularidade:8 },
  { nome:"Kung Fu Panda", imagem:"imagens/kungfupanda.jpg", forca:9, velocidade:7, inteligencia:6, popularidade:8 },
  { nome:"Gogeta", imagem:"imagens/gogeta.jpg", forca:10, velocidade:10, inteligencia:8, popularidade:10 }
];

// ====== VARIÁVEIS PRINCIPAIS ======
var cartaJogador1, cartaJogador2;
var vezJogador1 = true; // alterna entre os jogadores
var score1 = 0;
var score2 = 0;
var rodada = 1;
var maxRodadas = 5;

// ====== ELEMENTOS ======
var modal = document.getElementById("modalResult");
var resultMsg = document.getElementById("resultMessage");
var nextBtn = document.getElementById("nextRoundBtn");

// ====== EVENTOS ======
document.getElementById("startGameBtn").addEventListener("click", iniciarJogo);
nextBtn.addEventListener("click", proximaRodada);

// ====== INICIAR JOGO ======
function iniciarJogo() {
  var nome1 = document.getElementById("player1Name").value;
  var nome2 = document.getElementById("player2Name").value;

  if (nome1 === "" || nome2 === "") {
    alert("Digite o nome dos dois jogadores!");
    return;
  }

  // Atualiza os nomes no placar
  document.getElementById("player1Display").innerText = nome1 + ": " + score1;
  document.getElementById("player2Display").innerText = nome2 + ": " + score2;

  // Mostra a tela do jogo
  document.getElementById("setup-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");

  sortearCartas();
}

// ====== SORTEIO DAS CARTAS ======
function sortearCartas() {
  var i1 = Math.floor(Math.random() * cartas.length);
  var i2 = Math.floor(Math.random() * cartas.length);

  while (i1 === i2) {
    i2 = Math.floor(Math.random() * cartas.length);
  }

  cartaJogador1 = cartas[i1];
  cartaJogador2 = cartas[i2];

  mostrarCarta(cartaJogador1, "foto-jogador", "nome-jogador");
  mostrarCarta(cartaJogador2, "foto-jogador2", "nome-jogador2");

  mostrarAtributos(cartaJogador1, "attr-jogador1", vezJogador1);
  mostrarAtributos(cartaJogador2, "attr-jogador2", !vezJogador1);

  atualizarVez();
  modal.classList.add("hidden");
}

// ====== MOSTRAR CARTA ======
function mostrarCarta(carta, idFoto, idNome) {
  document.getElementById(idFoto).src = carta.imagem;
  document.getElementById(idNome).innerText = carta.nome;
}

// ====== MOSTRAR ATRIBUTOS ======
function mostrarAtributos(carta, id, ativo) {
  var area = document.getElementById(id);
  area.innerHTML = "";

  // Para cada atributo da carta
  for (var chave in carta) {
    if (chave === "nome" || chave === "imagem") {
      continue;
    }

    var botao = document.createElement("button");
    botao.className = "attr-btn";
    botao.innerText = chave.charAt(0).toUpperCase() + chave.slice(1);

    if (ativo) {
      botao.onclick = function(attr) {
        return function() {
          jogar(attr);
        };
      }(chave);
    } else {
      botao.disabled = true;
    }

    area.appendChild(botao);
  }
}

// ====== COMPARAR OS ATRIBUTOS ======
function jogar(atributo) {
  var valor1 = cartaJogador1[atributo];
  var valor2 = cartaJogador2[atributo];
  var resultado = "";

  // Ver quem venceu a rodada
  if (valor1 > valor2) {
    score1++;
    resultado = "🏆 " + document.getElementById("player1Name").value + " venceu esta rodada!";
  } else if (valor2 > valor1) {
    score2++;
    resultado = "🏆 " + document.getElementById("player2Name").value + " venceu esta rodada!";
  } else {
    resultado = "🤝 Empate!";
  }

  resultMsg.innerText = cartaJogador1.nome + " (" + valor1 + ") vs " + cartaJogador2.nome + " (" + valor2 + ")\n" + resultado;
  modal.classList.remove("hidden");

  atualizarPlacar();

  // Verifica se chegou na última rodada
  if (rodada === maxRodadas) {
    nextBtn.innerText = "Ver Resultado Final";
  } else {
    nextBtn.innerText = "Próxima Rodada";
  }
}

// ====== IR PARA A PRÓXIMA RODADA ======
function proximaRodada() {
  if (rodada >= maxRodadas) {
    finalizarJogo();
  } else {
    rodada++;
    document.getElementById("roundNumber").innerText = rodada;
    vezJogador1 = !vezJogador1; // alterna a vez
    sortearCartas();
  }
}

// ====== FINAL DO JOGO ======
function finalizarJogo() {
  var nome1 = document.getElementById("player1Name").value;
  var nome2 = document.getElementById("player2Name").value;
  var msg = "";

  if (score1 > score2) {
    msg = "🏆 " + nome1 + " venceu o jogo com " + score1 + " pontos!";
  } else if (score2 > score1) {
    msg = "🏆 " + nome2 + " venceu o jogo com " + score2 + " pontos!";
  } else {
    msg = "🤝 Empate total!";
  }

  resultMsg.innerText = msg;
  nextBtn.innerText = "Reiniciar Jogo";
  nextBtn.onclick = function() {
    window.location.reload();
  };
}

// ====== ATUALIZAR INFORMAÇÕES ======
function atualizarVez() {
  var texto = vezJogador1 ? "👉 Vez do Jogador 1" : "👉 Vez do Jogador 2";
  document.getElementById("turnIndicator").innerText = texto;
}

function atualizarPlacar() {
  var nome1 = document.getElementById("player1Name").value;
  var nome2 = document.getElementById("player2Name").value;

  document.getElementById("player1Display").innerText = nome1 + ": " + score1;
  document.getElementById("player2Display").innerText = nome2 + ": " + score2;
}
