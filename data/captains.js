export const captainAbilities = {

  crewBuff(game, player, cardPlayed) {
    cardPlayed.power += 1;
  },

  fighterBonus(game, player, cardPlayed) {
    if (cardPlayed.tags?.includes("fighter")) {
      cardPlayed.power += 2;
    }
  }

};