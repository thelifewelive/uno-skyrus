const { Game } = require('../../src/models/game.js');
const chai = require('chai');
const sinon = require('sinon');

const {
  twoCards,
  dummyShuffler,
  numberDeck,
  twelveCards,
  tenCards,
  sevenCards
} = require('../testHelpers/testHelpers.js');

describe('Game Class', () => {
  describe('startGame', function() {
    let game, deck;

    beforeEach(function() {
      const identity = deck => deck;
      const player = {
        id: 1234,
        name: 'player',
        cards: [],
        addCards: function(cards) {
          player.cards = cards;
        },
        calculatePlayableCards: () => {}
      };
      const players = {
        getPlayers: () => {
          return [player];
        },
        setFirstTurn: () => {},
        setCurrentPlayer: () => {}
      };
      deck = numberDeck.map(card => {
        card.getColor = () => card.color;
        return card;
      });
      game = new Game(deck, 1, 1234, players);
      game.startGame(identity);
    });

    it('startGame method should create stack', function() {
      const actual = game.stack;
      const expected = [deck[0]];
      chai.assert.deepEqual(actual, expected);
    });

    it('startGame method should initialize pile', function() {
      const actual = game.pile;
      const expected = [deck[1]];
      chai.assert.deepEqual(actual, expected);
    });

    it('should assign 7 cards to each player', function() {
      const expectedOutput = [
        deck[2],
        deck[3],
        deck[4],
        deck[5],
        deck[6],
        deck[7],
        deck[8]
      ];
      const actualOutput = game.getPlayerCards(1234);
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('getTopDiscard', function() {
    it('getTopDiscard should return topDicard from pile', function() {
      const players = {
        getPlayers: () => [],
        setFirstTurn: () => {},
        setCurrentPlayer: () => {}
      };
      const deck = numberDeck.map(card => {
        card.getColor = () => card.color;
        return card;
      });
      const game = new Game(deck, 0, 1234, players);
      game.startGame(dummyShuffler);
      const actual = game.getTopDiscard();
      const expected = deck[0];
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('getPlayers', function() {
    it('should return all players', function() {
      const players = {
        players: [
          {
            name: 'player',
            cards: []
          }
        ]
      };
      const game = new Game(twoCards, 0, 1234, players);
      const actual = game.getPlayers();
      const expected = {
        players: [
          {
            name: 'player',
            cards: []
          }
        ]
      };
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('getPlayersCount', function() {
    it('should return all players', function() {
      const game = new Game(twoCards, 0, 1234, {});
      const actual = game.getPlayersCount();
      const expected = 0;
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('getKey', function() {
    it('should return all players', function() {
      const game = new Game(twoCards, 0, 1234, {});
      const actual = game.getKey();
      const expected = 1234;
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('hasStarted', function() {
    it('should return false when game has not started', function() {
      const game = new Game(twoCards, 0, 1234, {});
      const actual = game.hasStarted();
      const expected = false;
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('throw card', () => {
    let game;
    const logMessage = () => {};
    const canPlayOnTopOf = () => true;
    let deck;

    beforeEach(() => {
      numberDeck[5] = {
        number: 6,
        color: 'green',
        canPlayOnTopOf: () => true
      };
      const identity = deck => deck;
      const player = {
        id: 1234,
        name: 'player',
        cards: [],
        getName: () => {
          return 'player';
        },
        thrownCards: 0,
        increaseThrownCard: () => {
          this.thrownCards++;
        },
        score: 0,
        calculateScore: () => 2,
        calculatePlayableCards: () => {},
        addCards: function(cards) {
          player.cards = cards;
        },
        getPlayableCards: () => {
          return [];
        },
        getId() {
          return player.id;
        },
        removeCard(cardId) {
          player.cards.splice(cardId, 1);
        },
        getCards() {
          return player.cards;
        },
        setUnoCall: () => {},
        getUnoCallStatus: () => {
          return true;
        },
        resetHasCaught: () => {}
      };
      const players = {
        getPlayers: () => {
          return [player];
        },
        getCurrentPlayer: () => {
          return player;
        },
        getPlayer() {
          return player;
        },
        setFirstTurn: () => {},
        setCurrentPlayer: () => {},
        updateCurrentPlayer: () => {}
      };

      deck = [
        {
          number: 1,
          color: 'yellow',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'yellow'
        },
        {
          number: 2,
          color: 'green',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'green'
        },
        {
          number: 3,
          color: 'blue',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'blue'
        },
        {
          number: 4,
          color: 'yellow',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'yellow'
        },
        {
          number: 5,
          color: 'red',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'red'
        },
        {
          number: 6,
          color: 'red',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'red'
        },
        {
          number: 7,
          color: 'blue',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'blue'
        },
        {
          number: 8,
          color: 'blue',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'blue'
        },
        {
          number: 9,
          color: 'green',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'green'
        },
        {
          symbol: '+2',
          color: 'green',
          isDrawTwo: true,
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'green'
        }
      ];

      game = new Game(deck, 1, 1234, players, {
        logThrowCard: () => {},
        logCallUno: () => {}
      });
      game.startGame(identity);
    });
    it('should remove card from player hand and put it on top of pile', () => {
      game.throwCard(1234, '3');
      const actual = game.getPlayerCards(1234);
      const expected = [deck[3], deck[4], deck[5], deck[7], deck[8], deck[9]];
      chai.assert.deepEqual(actual, expected);
    });
    it('should not remove card from player hand', () => {
      const expected = game.pile;
      game.throwCard(124, '3');
      const actual = game.pile;
      chai.assert.deepEqual(actual, expected);
    });
    it('should increase the cardsToDraw by 1', function() {
      game.throwCard(1234, '6');
      const expected = 2;
      const actual = game.cardsToDraw;
      chai.assert.deepEqual(actual, expected);
    });

    it('should increase the cardsToDraw by 2', function() {
      game.cardsToDraw = 2;
      game.throwCard(1234, '6');
      const expected = 4;
      const actual = game.cardsToDraw;
      chai.assert.deepEqual(actual, expected);
    });

    it('should change hasDrawn to false', function() {
      game.throwCard(1234, '6');
      const expected = false;
      const actual = game.hasDrawnTwo;
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('drawCards', function() {
    it('should not remove a card from stack if not current player', function() {
      const player = {
        addCard: () => {},
        calculatePlayableCards: () => {},
        addCards: () => {},
        getId: () => 234,
        getName: () => 'Aftab',
        getDrawCardStatus: () => true,
        getPlayableCards: () => [],
        id: 234


      };
      const players = {
        getCurrentPlayer: () => player,
        getPlayers: () => [player],
        setCurrentPlayer: () => player
      };

      const getColor = () => this.color;

      const deck = tenCards.map(card => {
        card.getColor = getColor;
        return card;
      });

      const game = new Game(deck, 0, 1234, players);
      game.startGame(dummyShuffler);
      game.drawCards(235);
      const actual = game.stack;
      const expected = [
        {
          number: 2,
          color: 'green',
          getColor
        },
        {
          number: 3,
          color: 'blue',
          getColor
        }
      ];
      chai.assert.deepEqual(actual, expected);
    });

    it('should remove a card from stack', function() {
      const player = {
        addCard: () => {},
        calculatePlayableCards: () => {},
        addCards: () => {},
        getId: () => 234,
        getName: () => 'player',
        getDrawCardStatus: () => true,
        setDrawCardStatus: () => {},
        setPlayableCards: () => {},
        id: 234,
        resetHasCaught: () => {},
        resetUnoCall: () => {},
        getPlayableCards: () => [],
        calculateScore: () => {}
      };
      const players = {
        getCurrentPlayer: () => player,
        getPlayers: () => [player],
        setCurrentPlayer: () => player,
        changeTurn: () => {}
      };
      const card = {
        number: 4,
        color: 'red',
        canPlayOnTopOf: () => true,
        getColor: () => 'red'
      };
      const activityLog = {
        logDrawCards: () => {}
      };
      let nineCards = sevenCards.slice();
      nineCards.unshift(card);
      nineCards.unshift(card);
      nineCards.unshift(card);
      nineCards = nineCards.map(card => {
        card.getColor = () => card.color;
        return card;
      });

      const game = new Game(nineCards, 0, 1234, players, activityLog);
      game.startGame(dummyShuffler);
      game.drawCards(234);
      const actual = game.stack;
      const expected = [card];
      chai.assert.deepEqual(actual, expected);
    });

    it('should remove a card from stack and pass turn if it  is not playable', function() {
      const player = {
        addCard: () => {},
        getName: () => 'player',
        calculatePlayableCards: () => {},
        addCards: () => {},
        getId: () => 234,
        getDrawCardStatus: () => true,
        setDrawCardStatus: () => {},
        setPlayableCards: () => {},
        id: 234,
        resetHasCaught: () => {},
        resetUnoCall: () => {},
        getPlayableCards: () => [],
        calculateScore: () => {}
      };
      const players = {
        getCurrentPlayer: () => player,
        getPlayers: () => [player],
        setCurrentPlayer: () => player,
        changeTurn: () => {}
      };
      const card = {
        number: 4,
        color: 'red',
        canPlayOnTopOf: () => false
      };
      const activityLog = {
        logDrawCards: () => {}
      };
      const nineCards = sevenCards.slice();
      nineCards.unshift(card);
      nineCards.unshift(card);
      nineCards.unshift(card);

      const game = new Game(nineCards, 0, 1234, players, activityLog);
      game.startGame(dummyShuffler);
      game.drawCards(234);
      const actual = game.stack;
      const expected = [card];
      chai.assert.deepEqual(actual, expected);
    });

    it('should remove two cards from stack ', function() {
      const player = {
        addCard: () => {},
        getName: () => 'player',
        calculatePlayableCards: () => {},
        addCards: () => {},
        getId: () => 234,
        getDrawCardStatus: () => true,
        setDrawCardStatus: () => {},
        setPlayableCards: () => {},
        id: 234,
        resetHasCaught: () => {},
        resetUnoCall: () => {},
        calculateScore: () => {}
      };

      const players = {
        getCurrentPlayer: () => player,
        getPlayers: () => [player],
        setCurrentPlayer: () => player,
        changeTurn: () => {}
      };

      const getColor = () => this.color;

      const deck = twelveCards.map(card => {
        card.getColor = getColor;
        return card;
      });

      const activityLog = {
        logDrawCards: () => {}
      };

      const game = new Game(deck, 0, 1234, players, activityLog);
      game.startGame(dummyShuffler);
      game.cardsToDraw = 2;
      game.drawCards(234);
      const actual = game.stack;

      const expected = [
        {
          number: 2,
          color: 'green',
          getColor
        },
        {
          number: 3,
          color: 'blue',
          getColor
        }
      ];
      chai.assert.deepEqual(actual, expected);
      chai.assert.deepEqual(game.cardsToDraw, 1);
      chai.assert.deepEqual(game.hasDrawnTwo, true);
    });
  });

  describe('getStack', function() {
    it('should return stack', function() {
      const game = new Game(numberDeck, 0, 1234, {});
      const actual = game.getStack();
      const expected = [];
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('refillStack', function() {
    it('should refill the stack from pile except topDiscard', function() {
      const game = new Game(
        numberDeck,
        0,
        1234,
        {},
        {
          logRefillStack: () => {}
        }
      );
      game.pile = twoCards;
      game.stack = [];
      game.refillStack();
      const actual = game.getStack();
      const expected = [
        {
          color: 'red',
          number: 5
        }
      ];
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('victoryStatus', () => {
    let players;
    beforeEach(() => {
      const player1 = {
        getName: () => 'player1',
        hasWon: () => false
      };
      const player2 = {
        getName: () => 'player2',
        hasWon: () => true
      };
      players = {
        players: [player1, player2],
        getPlayers: () => players.players,
        getPlayersCount: () => 2
      };
    });
    it('should return has won true and name of player if the player has won', function() {
      const game = new Game([], 2, 1234, players, {});
      const actual = game.victoryStatus();
      const expected = {
        name: 'player2',
        hasWon: true
      };
      chai.assert.deepEqual(actual, expected);
    });
    it('should return has won true and name of player if the player has won', function() {
      players.players[1].hasWon = () => false;
      const game = new Game([], 2, 1234, players, {});
      const actual = game.victoryStatus();
      const expected = {
        hasWon: false
      };
      chai.assert.deepEqual(actual, expected);
    });

    it('should return has won true and name of player if the player has won', function() {
      players.players[1].hasWon = () => false;
      const game = new Game([], 2, 1234, players, {});
      const actual = game.victoryStatus();
      const expected = {
        hasWon: false
      };
      chai.assert.deepEqual(actual, expected);
    });

    it('should return has won true and name of player if the player has won', function() {
      players.players[1].hasWon = () => false;
      players.getPlayersCount = () => 1;
      const game = new Game([], 2, 1234, players, {});
      const actual = game.victoryStatus();
      const expected = {
        hasWon: true,
        name: 'player1'
      };
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('updateRunningColor', function() {
    let game, player, players;
    const identity = value => value;

    beforeEach(function() {
      player = {
        getId: () => 12,
        calculatePlayableCards: () => {},
        addCards: () => {}
      };
      players = {
        getCurrentPlayer: () => player,
        getPlayers: () => [player],
        setCurrentPlayer: () => {},
        changeTurn: () => {}
      };
    });
    it('should not change the running color when wild card is not in the pile', function() {
      tenCards[2] = {
        isWildCard: false,
        getColor: () => 'blue',
        setColorAsDeclared: () => {}
      };
      game = new Game(tenCards, 1, 1234, players, {});
      game.startGame(identity);
      game.updateRunningColor(12, 'red');
      const expectedOutput = 'blue';
      const actualOutput = game.getRunningColor();
      chai.assert.equal(actualOutput, expectedOutput);
    });

    it('should change the running color when wild card is on the top of pile', function() {
      tenCards[2] = {
        isWildCard: true,
        getColor: () => 'green',
        setColorAsDeclared: () => {}
      };
      game = new Game(tenCards, 1, 1234, players, {});
      game.startGame(identity);
      game.updateRunningColor(12, 'red');
      const expectedOutput = 'red';
      const actualOutput = game.getRunningColor();
      chai.assert.equal(actualOutput, expectedOutput);
    });
  });

  describe('haveToDrawMultiple', function() {
    it('should return true if cardsToDraw is greater than 1', function() {
      let game = new Game([], 2, 1234, {}, {});
      game.cardsToDraw = 2;
      const actual = true;
      const expected = game.haveToDrawMultiple();
      chai.assert.equal(actual, expected);
    });
    it('should return false if cardsToDraw is 1', function() {
      let game = new Game([], 2, 1234, {}, {});
      game.cardsToDraw = 1;
      const actual = false;
      const expected = game.haveToDrawMultiple();
      chai.assert.equal(actual, expected);
    });
  });

  describe('catch player', () => {
    let game;
    const logMessage = () => {};
    const canPlayOnTopOf = () => true;
    let deck;

    beforeEach(() => {
      numberDeck[5] = {
        number: 6,
        color: 'green',
        canPlayOnTopOf: () => true
      };
      const identity = deck => deck;
      const player1 = {
        id: 1234,
        name: 'player',
        cards: [],
        getName: () => {
          return 'player';
        },
        calculatePlayableCards: () => {},
        addCards: function(cardsToAdd) {
          player1.cards = player1.cards.concat(cardsToAdd);
        },
        getPlayableCards: () => {
          return [];
        },
        getId() {
          return player1.id;
        },
        removeCard(cardId) {
          player1.cards.splice(cardId, 1);
        },
        getCards() {
          return player1.cards;
        },
        setUnoCall: () => {},
        getUnoCallStatus: () => {
          return false;
        },
        resetHasCaught: () => {},
        hasCaught: false,
        getCardsCount: function() {
          return this.cards.length;
        },
        setHasCaught: () => {}
      };
      const player2 = {
        cards: [],
        getName: () => 'catching player',
        calculatePlayableCards: () => {},
        addCards: function(cardsToAdd) {
          player2.cards = player2.cards.concat(cardsToAdd);
        },
        getCardsCount: function() {
          return player2.cards.length;
        }
      };
      const players = {
        getPlayers: () => {
          return [player1, player2];
        },
        getPlayer() {
          return player2;
        },
        setFirstTurn: () => {},
        setCurrentPlayer: () => {},
        updateCurrentPlayer: () => {},
        getLastPlayer: () => player1
      };

      deck = [
        {
          number: 1,
          color: 'yellow',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'yellow'
        },
        {
          number: 2,
          color: 'green',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'green'
        },
        {
          number: 3,
          color: 'blue',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'blue'
        },
        {
          number: 4,
          color: 'yellow',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'yellow'
        },
        {
          number: 5,
          color: 'red',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'red'
        },
        {
          number: 6,
          color: 'red',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'red'
        },
        {
          number: 7,
          color: 'blue',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'blue'
        },
        {
          number: 8,
          color: 'blue',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'blue'
        },
        {
          number: 9,
          color: 'green',
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'green'
        },
        {
          symbol: '+2',
          color: 'green',
          isDrawTwo: true,
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'green'
        },
        {
          symbol: '+2',
          color: 'blue',
          isDrawTwo: true,
          logMessage,
          canPlayOnTopOf,
          getColor: () => 'blue'
        }
      ];

      game = new Game(deck, 1, 1234, players, {
        logCaught: () => {},
        logWrongCatch: () => {},
        logRefillStack: () => {}
      });
      game.startGame(identity);
    });
    it('should add 2 cards to the hand of last player', () => {
      game.pile = deck.slice();
      game.players.getLastPlayer().cards = [
        {
          number: 9,
          color: 'green'
        }
      ];

      game.catchPlayer('1234');

      const actual = game.players.getLastPlayer().getCardsCount();
      const expected = 3;
      chai.assert.deepEqual(actual, expected);
    });

    it('should refill the stack and add 2 cards to the hand of last player when stack length is less than 2 cards', () => {
      game.players.getLastPlayer().cards = [
        {
          number: 9,
          color: 'green'
        }
      ];
      game.stack = [
        {
          number: 9,
          color: 'green'
        }
      ];
      game.pile = deck;
      game.catchPlayer('1234');

      const actual = game.players.getLastPlayer().getCardsCount();
      const expected = 3;
      chai.assert.deepEqual(actual, expected);
    });

    it('should not add 2 cards to the hand of last player when last player have more than 1 cards', () => {
      game.catchPlayer('1234');

      const actual = game.players.getLastPlayer().getCardsCount();
      const expected = 7;
      chai.assert.deepEqual(actual, expected);
    });

    it('should add 2 cards to the hand of catching player when last player have more than 1 cards', () => {
      game.pile = deck.slice();
      game.players.getPlayer().cards = [];

      game.players.getLastPlayer().cards = [
        {
          number: 9,
          color: 'green'
        },
        { number: 9, color: 'green' }
      ];
      game.catchPlayer('1234');
      const actual = game.players.getPlayer().getCardsCount();
      const expected = 2;
      chai.assert.deepEqual(actual, expected);
    });

    it('should add 2 cards to the hand of catching player when last player has called uno', () => {
      game.pile = deck.slice();
      game.players.getPlayer().cards = [];

      game.players.getLastPlayer().cards = [
        {
          number: 9,
          color: 'green'
        },
        { number: 9, color: 'green' }
      ];
      game.players.getLastPlayer().getUnoCallStatus = () => {
        return true;
      };
      game.catchPlayer('1234');
      const actual = game.players.getPlayer().getCardsCount();
      const expected = 2;
      chai.assert.deepEqual(actual, expected);
    });

    it('should not add 2 cards to the hand of catching player when last player has 1 card left', () => {
      game.pile = deck.slice();
      game.players.getPlayer().cards = [];

      game.players.getLastPlayer().cards = [
        {
          number: 9,
          color: 'green'
        }
      ];

      game.catchPlayer('1234');
      const actual = game.players.getPlayer().getCardsCount();
      const expected = 0;
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('leaveGame', function() {
    let game;

    beforeEach(function() {
      const activityLog = { logLeaveGame: () => {} };
      const players = {
        players: [
          {
            '12': {},
            getName: () => 'reshmi',
            getCards : () =>[]
          }
        ],
        removePlayer: function() {
          this.players = [];
        },
        getPlayer: function() {
          return this.players[0];
        },
        getPlayersCount: function() {
          return this.players.length;
        }
      };
      game = new Game([], 1, '1', players, activityLog);
    });

    it('should remove the requested player from players', function() {
      game.leaveGame('12');
      const actualOutput = game.players.players;
      const expectedOutput = [];

      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('initializePile', function() {
    const wildDrawFour = {
      isWildCard: true,
      isDrawFour: true,
      isColorDeclared: false
    };

    const drawTwo = {
      isDrawTwo: true
    };

    const reverseCard = {
      isReverseCard: true
    };

    const skipCard = {
      isSkipCard: true
    };

    const numberCard = {
      number: 5,
      color: 'green'
    };

    const players = {};
    players.updateCurrentPlayer = sinon.spy();
    players.changeTurn = sinon.spy();

    const identity = x => x;
    let game;

    beforeEach(function() {
      game = new Game([], 1, 1234, players);
    });

    it('should return card to the deck, shuffle, flip top card to start discard pile if top discard is wild draw four', function() {
      game.stack = [numberCard, wildDrawFour];
      game.initializePile(identity);
      const actual = game.getTopDiscard();
      const expected = numberCard;
      chai.assert.deepEqual(actual, expected);
    });

    it('should set cards to draw to two when top discard is draw two', function() {
      game.stack = [numberCard, drawTwo];
      game.initializePile(identity);
      const actual = game.cardsToDraw;
      const expected = 2;
      chai.assert.deepEqual(actual, expected);
    });

    it('should call players.updateCurrentPlayer with top discard', function() {
      game.stack = [numberCard, reverseCard];
      game.initializePile(identity);
      sinon.assert.calledWith(players.updateCurrentPlayer, reverseCard);
    });

    it('should call players.changeTurn when top discard is a skip card', function() {
      game.stack = [numberCard, skipCard];
      game.initializePile(identity);
      sinon.assert.calledOnce(players.changeTurn);
    });
  });
});

describe('updateSaveStatus', () => {
  let game = new Game([], 1, '1234', [], []);
  it('should save the game status', () => {
    game.updateSaveStatus();
    const actual = game.saveStatus.status;
    const expected = true;
    chai.assert.equal(actual, expected);
  });
});

describe('getSaveStatus', () => {
  let game = new Game([], 1, '1234', [], []);
  it('should return the save status', () => {
    const actual = game.getSaveStatus();
    const expected = {
      status: false
    };
    chai.assert.deepEqual(actual, expected);
  });
});
