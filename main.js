import { Game } from "./engine/game.js";
import { Player } from "./engine/player.js";
import { Island } from "./engine/island.js";
import { cards } from "./data/cards.js";
import { botPlay } from "./engine/bot.js";

const player = new Player(
  "player",
  [cards.luffy, cards.zoro],
  "crewBuff"
);

const bot = new Player(
  "bot",
  [cards.zoro],
  "fighterBonus"
);

player.hand = [...player.deck];
bot.hand = [...bot.deck];

const islands = [
  new Island(1),
  new Island(2),
  new Island(3)
];

const game = new Game(player, bot, islands);

document.getElementById("nextTurn").onclick = () => {
  botPlay(game);
  game.nextTurn();
  render();
};

function render() {
  const div = document.getElementById("game");

  div.innerHTML = `
    <h2>Turn ${game.turn}</h2>
    <p>Energy: ${player.energy}</p>
    <h3>Board</h3>
    ${player.board.map(c =>
      `<div class="card">${c.name} (${c.power})</div>`
    ).join("")}
  `;
}

render();