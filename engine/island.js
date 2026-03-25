export class Island {
  constructor(id) {
    this.id = id;
    this.revealed = false;
    this.cards = {
      player: [],
      bot: []
    };
  }
}