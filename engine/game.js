// ======================
// GAME STATE
// ======================

let energy = 1;
let turn = 1;

let playerHand = [];
let board = [];


// ======================
// CAPTAINS SYSTEM
// ======================

const captains = {
  luffy: {
    id: "luffy",
    name: "Monkey D. Luffy",
    bonusText: "+1 puissance pour tous les alliés",

    applyBonus(card) {
      card.power += 1;
    }
  },

  zoro: {
    id: "zoro",
    name: "Roronoa Zoro",
    bonusText: "+2 puissance pour les cartes Attack",

    applyBonus(card) {
      if (card.type === "attack") {
        card.power += 2;
      }
    }
  }
};


// ======================
// PLAYER DECK
// ======================

const playerDeck = {
  captain: "luffy",
  cards: [
    { name: "Nami", cost: 1, power: 2, type: "support" },
    { name: "Usopp", cost: 2, power: 3, type: "attack" },
    { name: "Sanji", cost: 3, power: 5, type: "attack" },
    { name: "Robin", cost: 2, power: 4, type: "support" },
    { name: "Franky", cost: 4, power: 6, type: "attack" }
  ]
};

let activeCaptain = null;


// ======================
// INIT CAPTAIN
// ======================

function initCaptain() {
  activeCaptain = captains[playerDeck.captain];

  document.getElementById("captainName").textContent =
    activeCaptain.name;

  document.getElementById("captainBonus").textContent =
    activeCaptain.bonusText;
}


// ======================
// DRAW CARD
// ======================

function drawCard() {
  if (playerDeck.cards.length === 0) return;

  const randomIndex = Math.floor(
    Math.random() * playerDeck.cards.length
  );

  const card = { ...playerDeck.cards[randomIndex] };

  playerHand.push(card);
  renderHand();
}


// ======================
// PLAY CARD
// ======================

function playCard(index) {
  const card = playerHand[index];

  if (card.cost > energy) {
    alert("Pas assez d'énergie !");
    return;
  }

  energy -= card.cost;

  // appliquer bonus capitaine
  if (activeCaptain) {
    activeCaptain.applyBonus(card);
  }

  board.push(card);
  playerHand.splice(index, 1);

  renderHand();
  renderBoard();
  updateUI();
}


// ======================
// RENDER HAND
// ======================

function renderHand() {
  const handDiv = document.getElementById("hand");
  handDiv.innerHTML = "";

  playerHand.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";

    cardEl.innerHTML = `
      <h3>${card.name}</h3>
      <p>Coût: ${card.cost}</p>
      <p>Puissance: ${card.power}</p>
    `;

    cardEl.onclick = () => playCard(index);

    handDiv.appendChild(cardEl);
  });
}


// ======================
// RENDER BOARD
// ======================

function renderBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";

  board.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = "card board-card";

    cardEl.innerHTML = `
      <h3>${card.name}</h3>
      <p>${card.power} ⚔️</p>
    `;

    boardDiv.appendChild(cardEl);
  });
}


// ======================
// UI UPDATE
// ======================

function updateUI() {
  document.getElementById("energy").textContent = energy;
  document.getElementById("turn").textContent = turn;
}


// ======================
// NEXT TURN
// ======================

function nextTurn() {
  turn++;
  energy = turn;

  drawCard();
  updateUI();
}


// ======================
// START GAME
// ======================

function startGame() {
  initCaptain();

  drawCard();
  drawCard();
  drawCard();

  updateUI();
}

startGame();