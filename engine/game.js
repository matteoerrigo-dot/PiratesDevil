import { abilities } from "../data/abilities.js";
import { captainAbilities } from "../data/captains.js";

export class Game {

  constructor(player, bot, islands) {
    this.player = player;
    this.bot = bot;
    this.islands = islands;

    this.turn = 1;
    this.turnPlays = { player: 0, bot: 0 };
  }

  playCard(player, card) {

    player.energy -= card.cost;
    player.board.push(card);

    this.turnPlays[player.name]++;

    // On Reveal
    if (card.onReveal) {
      abilities[card.onReveal](this, card);
    }

    // Capitaine
    const cap = captainAbilities[player.captain];
    if (cap) {
      cap(this, player, card);
    }
  }

  nextTurn() {
    this.turn++;
    this.player.energy = this.turn;
    this.bot.energy = this.turn;
    this.turnPlays = { player: 0, bot: 0 };
  }
}