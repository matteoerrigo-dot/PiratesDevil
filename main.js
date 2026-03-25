let turn = 1;
let energy = 1;

const turnEl = document.getElementById("turn");
const energyEl = document.getElementById("energy");
const handDiv = document.getElementById("handCards");
const boardDiv = document.getElementById("boardCards");

const deck = [
  { name: "Luffy", cost: 1, power: 2 },
  { name: "Zoro", cost: 2, power: 4 },
  { name: "Nami", cost: 1, power: 1 },
  { name: "Sanji", cost: 3, power: 5 },
  { name: "Usopp", cost: 2, power: 3 }
];

let hand = [];
let board = [];

function updateUI() {
  turnEl.textContent = turn;
  energyEl.textContent = energy;

  renderHand();
  renderBoard();
}

function drawCard() {
  if (deck.length > 0) {
    hand.push(deck.shift());
  }
}

function renderHand() {
  handDiv.innerHTML = "";

  hand.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <strong>${card.name}</strong>
      <div class="cost">Cost: ${card.cost}</div>
      <div class="power">Power: ${card.power}</div>
    `;

    div.onclick = () => playCard(index);

    handDiv.appendChild(div);
  });
}

function renderBoard() {
  boardDiv.innerHTML = "";

  board.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <strong>${card.name}</strong>
      <div class="power">⚔ ${card.power}</div>
    `;

    boardDiv.appendChild(div);
  });
}

function playCard(index) {
  const card = hand[index];

  if (card.cost > energy) {
    alert("Not enough energy!");
    return;
  }

  energy -= card.cost;
  board.push(card);
  hand.splice(index, 1);

  updateUI();
}

document.getElementById("nextTurn").onclick = () => {
  turn++;
  energy = turn;
  drawCard();
  updateUI();
};

drawCard();
drawCard();
drawCard();
updateUI();