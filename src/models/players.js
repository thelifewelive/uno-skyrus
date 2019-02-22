class Players {
  constructor(hostPlayer) {
    this.host = hostPlayer;
    this.players = [hostPlayer];
    this.currentPlayer = {};
    this.currentPlayerIndex = 1;
  }
  getCurrentPlayer() {
    return this.currentPlayer;
  }
  getNumberOfPlayers() {
    return this.players.length;
  }
  addPlayer(player) {
    this.players.push(player);
  }
  getPlayers() {
    return this.players;
  }

  getPlayer(playerId) {
    return this.players.find(player => {
      return player.id == playerId;
    });
  }

  isCurrent(player) {
    return this.currentPlayer.id == player.id;
  }

  setCurrentPlayer() {
    this.currentPlayer = this.players[this.currentPlayerIndex];
  }

  changeTurn() {
    this.currentPlayer.setDrawCardStatus(true);
    this.currentPlayerIndex += 1;
    if (this.players.length == this.currentPlayerIndex) {
      this.currentPlayerIndex = 0;
    }
    this.setCurrentPlayer();
  }

  updateCurrentPlayer(thrownCard) {
    const updatedIndex = thrownCard.action(this.currentPlayerIndex);
    this.currentPlayerIndex = updatedIndex % this.getNumberOfPlayers();
    this.setCurrentPlayer();
  }
}

module.exports = { Players };
