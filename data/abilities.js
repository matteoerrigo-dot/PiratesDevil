export const abilities = {

  luffyBoost(game, card) {
    const alliesPlayed = game.turnPlays[card.owner] > 1;
    if (alliesPlayed) card.power += 2;
  },

  selfBuff(game, card) {
    card.power += 1;
  }

};