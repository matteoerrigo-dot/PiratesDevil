export class Player {
  constructor(name, deck, captain) {
    this.name = name;
    this.deck = deck;
    this.captain = captain;
    this.hand = [];
    this.board = [];
    this.energy = 1;
  }
}