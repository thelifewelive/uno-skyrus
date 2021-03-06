const twoCards = [{ color: 'red', number: 5 }, { color: 'green', number: 7 }];

const dummyShuffler = function(deck) {
  const newDeck = deck.slice();
  const card = newDeck.shift();
  newDeck.push(card);
  return newDeck;
};

const numberDeck = [
  { number: 1, color: 'red' },
  { number: 2, color: 'green' },
  { number: 3, color: 'blue' },
  { number: 4, color: 'yellow' },
  { number: 5, color: 'red' },
  { number: 6, color: 'green' },
  { number: 7, color: 'blue' },
  { number: 8, color: 'blue' },
  { number: 9, color: 'green' }
];

const twelveCards = [
  { number: 1, color: 'red' },
  { number: 2, color: 'green' },
  { number: 3, color: 'blue' },
  { number: 4, color: 'yellow' },
  { number: 5, color: 'red' },
  { number: 6, color: 'green' },
  { number: 7, color: 'blue' },
  { number: 8, color: 'blue' },
  { number: 9, color: 'green' },
  { number: 9, color: 'yellow' },
  { number: 6, color: 'green' },
  { number: 4, color: 'red' }
];

const tenCards = [
  { number: 1, color: 'red' },
  { number: 2, color: 'green' },
  { number: 3, color: 'blue' },
  { number: 4, color: 'yellow' },
  { number: 5, color: 'red' },
  { number: 6, color: 'green' },
  { number: 7, color: 'blue' },
  { number: 8, color: 'blue' },
  { number: 9, color: 'green' },
  { number: 9, color: 'yellow' }
];

const sevenCards = [
  { number: 1, color: 'red' },
  { number: 2, color: 'green' },
  { number: 3, color: 'blue' },
  { number: 4, color: 'yellow' },
  { number: 5, color: 'red' },
  { number: 6, color: 'green' },
  { number: 7, color: 'blue' }
];

const gameData = {
  players: {
    host: {
      name: 'Athul',
      cards: [
        { number: 2, color: 'green' },
        { number: 1, color: 'yellow' },
        { number: 7, color: 'green' }
      ],
      id: 1551463509642,
      hasCaught: false,
      playableCards: [
        { number: 2, color: 'green' },
        { number: 7, color: 'green' }
      ],
      canDrawCard: true,
      unoCallStatus: false
    },
    players: [
      {
        name: 'Athul',
        cards: [
          { number: 2, color: 'green' },
          { number: 1, color: 'yellow' },
          { number: 7, color: 'green' }
        ],
        id: 1551463509642,
        hasCaught: false,
        playableCards: [
          { number: 2, color: 'green' },
          { number: 7, color: 'green' }
        ],
        canDrawCard: true,
        unoCallStatus: false
      },
      {
        name: 'Rishab',
        cards: [
          { color: 'yellow', isSkipCard: true, symbol: '&#8856;' },
          { number: 6, color: 'yellow' },
          { number: 8, color: 'green' },
          { number: 5, color: 'blue' },
          { number: 0, color: 'green' },
          { number: 5, color: 'blue' },
          { symbol: '&#8693', color: 'green', isReverseCard: true },
          { number: 4, color: 'green' },
          { number: 4, color: 'blue' }
        ],
        id: 1551463540606,
        hasCaught: false,
        playableCards: [
          { number: 8, color: 'green' },
          { number: 5, color: 'blue' },
          { number: 0, color: 'green' },
          { number: 5, color: 'blue' },
          { symbol: '&#8693', color: 'green', isReverseCard: true },
          { number: 4, color: 'green' }
        ],
        canDrawCard: true,
        unoCallStatus: false
      }
    ],
    lastPlayer: {
      name: 'Athul',
      cards: [
        { number: 2, color: 'green' },
        { number: 1, color: 'yellow' },
        { number: 7, color: 'green' }
      ],
      id: 1551463509642,
      hasCaught: false,
      playableCards: [
        { number: 2, color: 'green' },
        { number: 7, color: 'green' }
      ],
      canDrawCard: true,
      unoCallStatus: false
    },
    currentPlayer: {
      name: 'Rishab',
      cards: [
        { color: 'yellow', isSkipCard: true, symbol: '&#8856;' },
        { number: 6, color: 'yellow' },
        { number: 8, color: 'green' },
        { number: 5, color: 'blue' },
        { number: 0, color: 'green' },
        { number: 5, color: 'blue' },
        { symbol: '&#8693', color: 'green', isReverseCard: true },
        { number: 4, color: 'green' },
        { number: 4, color: 'blue' }
      ],
      id: 1551463540606,
      hasCaught: false,
      playableCards: [
        { number: 8, color: 'green' },
        { number: 5, color: 'blue' },
        { number: 0, color: 'green' },
        { number: 5, color: 'blue' },
        { symbol: '&#8693', color: 'green', isReverseCard: true },
        { number: 4, color: 'green' }
      ],
      canDrawCard: true,
      unoCallStatus: false
    },
    currentPlayerIndex: 1,
    turnDirection: 1
  },
  activityLog: {
    logs: [
      'Rishab has drawn a card',
      'Rishab has thrown 2 red',
      'Athul has thrown +2 red',
      'Rishab has drawn 2 cards',
      'Athul has thrown 7 red',
      'Rishab has drawn a card',
      'Athul has thrown 3 red',
      'Rishab has thrown 3 green',
      'Athul has thrown 5 green'
    ]
  },
  deck: [
    { number: 0, color: 'red' },
    { number: 0, color: 'blue' },
    { number: 0, color: 'green' },
    { number: 0, color: 'yellow' },
    { number: 1, color: 'red' },
    { number: 1, color: 'blue' },
    { number: 1, color: 'green' },
    { number: 1, color: 'yellow' },
    { number: 2, color: 'red' },
    { number: 2, color: 'blue' },
    { number: 2, color: 'green' },
    { number: 2, color: 'yellow' },
    { number: 3, color: 'red' },
    { number: 3, color: 'blue' },
    { number: 3, color: 'green' },
    { number: 3, color: 'yellow' },
    { number: 4, color: 'red' },
    { number: 4, color: 'blue' },
    { number: 4, color: 'green' },
    { number: 4, color: 'yellow' },
    { number: 5, color: 'red' },
    { number: 5, color: 'blue' },
    { number: 5, color: 'green' },
    { number: 5, color: 'yellow' },
    { number: 6, color: 'red' },
    { number: 6, color: 'blue' },
    { number: 6, color: 'green' },
    { number: 6, color: 'yellow' },
    { number: 7, color: 'red' },
    { number: 7, color: 'blue' },
    { number: 7, color: 'green' },
    { number: 7, color: 'yellow' },
    { number: 8, color: 'red' },
    { number: 8, color: 'blue' },
    { number: 8, color: 'green' },
    { number: 8, color: 'yellow' },
    { number: 9, color: 'red' },
    { number: 9, color: 'blue' },
    { number: 9, color: 'green' },
    { number: 9, color: 'yellow' },
    { number: 1, color: 'red' },
    { number: 1, color: 'blue' },
    { number: 1, color: 'green' },
    { number: 1, color: 'yellow' },
    { number: 2, color: 'red' },
    { number: 2, color: 'blue' },
    { number: 2, color: 'green' },
    { number: 2, color: 'yellow' },
    { number: 3, color: 'red' },
    { number: 3, color: 'blue' },
    { number: 3, color: 'green' },
    { number: 3, color: 'yellow' },
    { number: 4, color: 'red' },
    { number: 4, color: 'blue' },
    { number: 4, color: 'green' },
    { number: 4, color: 'yellow' },
    { number: 5, color: 'red' },
    { number: 5, color: 'blue' },
    { number: 5, color: 'green' },
    { number: 5, color: 'yellow' },
    { number: 6, color: 'red' },
    { number: 6, color: 'blue' },
    { number: 6, color: 'green' },
    { number: 6, color: 'yellow' },
    { number: 7, color: 'red' },
    { number: 7, color: 'blue' },
    { number: 7, color: 'green' },
    { number: 7, color: 'yellow' },
    { number: 8, color: 'red' },
    { number: 8, color: 'blue' },
    { number: 8, color: 'green' },
    { number: 8, color: 'yellow' },
    { number: 9, color: 'red' },
    { number: 9, color: 'blue' },
    { number: 9, color: 'green' },
    { number: 9, color: 'yellow' },
    { isWildCard: true, isColorDeclared: false },
    { isWildCard: true, isColorDeclared: false },
    { isWildCard: true, isColorDeclared: false },
    { isWildCard: true, isColorDeclared: false },
    { symbol: '+2', color: 'red', isDrawTwo: true },
    { symbol: '+2', color: 'blue', isDrawTwo: true },
    { symbol: '+2', color: 'green', isDrawTwo: true },
    { symbol: '+2', color: 'yellow', isDrawTwo: true },
    { symbol: '+2', color: 'red', isDrawTwo: true },
    { symbol: '+2', color: 'blue', isDrawTwo: true },
    { symbol: '+2', color: 'green', isDrawTwo: true },
    { symbol: '+2', color: 'yellow', isDrawTwo: true },
    { color: 'red', isSkipCard: true, symbol: '&#8856;' },
    { color: 'blue', isSkipCard: true, symbol: '&#8856;' },
    { color: 'green', isSkipCard: true, symbol: '&#8856;' },
    { color: 'yellow', isSkipCard: true, symbol: '&#8856;' },
    { color: 'red', isSkipCard: true, symbol: '&#8856;' },
    { color: 'blue', isSkipCard: true, symbol: '&#8856;' },
    { color: 'green', isSkipCard: true, symbol: '&#8856;' },
    { color: 'yellow', isSkipCard: true, symbol: '&#8856;' },
    { symbol: '&#8693', color: 'red', isReverseCard: true },
    { symbol: '&#8693', color: 'blue', isReverseCard: true },
    { symbol: '&#8693', color: 'green', isReverseCard: true },
    { symbol: '&#8693', color: 'yellow', isReverseCard: true },
    { symbol: '&#8693', color: 'red', isReverseCard: true },
    { symbol: '&#8693', color: 'blue', isReverseCard: true },
    { symbol: '&#8693', color: 'green', isReverseCard: true },
    { symbol: '&#8693', color: 'yellow', isReverseCard: true },
    {
      symbol: '+4',
      isDrawFour: true,
      isWildCard: true,
      isColorDeclared: false
    },
    {
      symbol: '+4',
      isDrawFour: true,
      isWildCard: true,
      isColorDeclared: false
    },
    {
      symbol: '+4',
      isDrawFour: true,
      isWildCard: true,
      isColorDeclared: false
    },
    {
      symbol: '+4',
      isDrawFour: true,
      isWildCard: true,
      isColorDeclared: false
    }
  ],
  stack: [
    { number: 1, color: 'blue' },
    { symbol: '+2', color: 'green', isDrawTwo: true },
    { number: 9, color: 'red' },
    { number: 4, color: 'red' },
    { color: 'red', isSkipCard: true, symbol: '&#8856;' },
    { number: 8, color: 'blue' },
    { number: 3, color: 'yellow' },
    { number: 8, color: 'blue' },
    { symbol: '&#8693', color: 'yellow', isReverseCard: true },
    { number: 9, color: 'green' },
    { symbol: '&#8693', color: 'green', isReverseCard: true },
    { number: 1, color: 'green' },
    { number: 7, color: 'blue' },
    { number: 1, color: 'red' },
    { number: 6, color: 'yellow' },
    { number: 9, color: 'blue' },
    { isWildCard: true, isColorDeclared: false },
    { symbol: '+2', color: 'green', isDrawTwo: true },
    { color: 'red', isSkipCard: true, symbol: '&#8856;' },
    { number: 6, color: 'red' },
    { number: 5, color: 'yellow' },
    { number: 7, color: 'green' },
    { number: 3, color: 'green' },
    { isWildCard: true, isColorDeclared: false },
    { number: 2, color: 'blue' },
    { number: 7, color: 'blue' },
    { number: 3, color: 'red' },
    { number: 2, color: 'green' },
    { number: 9, color: 'blue' },
    { number: 2, color: 'blue' },
    { number: 3, color: 'yellow' },
    { symbol: '+2', color: 'yellow', isDrawTwo: true },
    { number: 6, color: 'blue' },
    { color: 'blue', isSkipCard: true, symbol: '&#8856;' },
    { number: 6, color: 'green' },
    { number: 4, color: 'blue' },
    { color: 'green', isSkipCard: true, symbol: '&#8856;' },
    { number: 4, color: 'green' },
    { number: 0, color: 'red' },
    { symbol: '&#8693', color: 'blue', isReverseCard: true },
    { number: 1, color: 'green' },
    { number: 8, color: 'red' },
    { number: 2, color: 'red' },
    { number: 8, color: 'red' },
    { number: 6, color: 'red' },
    { number: 9, color: 'green' },
    {
      symbol: '+4',
      isDrawFour: true,
      isWildCard: true,
      isColorDeclared: false
    },
    { number: 4, color: 'yellow' },
    { number: 1, color: 'red' },
    { number: 5, color: 'yellow' },
    { number: 9, color: 'yellow' },
    { number: 2, color: 'yellow' },
    {
      symbol: '+4',
      isDrawFour: true,
      isWildCard: true,
      isColorDeclared: false
    },
    { number: 6, color: 'blue' },
    { number: 1, color: 'blue' },
    { number: 9, color: 'yellow' },
    { symbol: '&#8693', color: 'red', isReverseCard: true },
    { number: 7, color: 'yellow' },
    { symbol: '+2', color: 'red', isDrawTwo: true },
    { color: 'green', isSkipCard: true, symbol: '&#8856;' },
    { color: 'yellow', isSkipCard: true, symbol: '&#8856;' },
    { isWildCard: true, isColorDeclared: false },
    { symbol: '+2', color: 'blue', isDrawTwo: true },
    { number: 9, color: 'red' },
    { number: 6, color: 'green' },
    { number: 8, color: 'green' },
    { number: 8, color: 'yellow' },
    { isWildCard: true, isColorDeclared: false },
    { number: 4, color: 'yellow' },
    { number: 5, color: 'red' },
    { symbol: '&#8693', color: 'blue', isReverseCard: true },
    { number: 5, color: 'green' },
    { number: 7, color: 'red' },
    { color: 'blue', isSkipCard: true, symbol: '&#8856;' },
    {
      symbol: '+4',
      isDrawFour: true,
      isWildCard: true,
      isColorDeclared: false
    },
    { number: 0, color: 'blue' },
    { symbol: '+2', color: 'blue', isDrawTwo: true },
    { number: 3, color: 'blue' },
    { number: 0, color: 'yellow' },
    { number: 3, color: 'blue' },
    { number: 7, color: 'yellow' },
    { number: 8, color: 'yellow' },
    { number: 1, color: 'yellow' },
    { number: 2, color: 'yellow' },
    { symbol: '&#8693', color: 'yellow', isReverseCard: true },
    { number: 4, color: 'red' },
    { number: 5, color: 'red' },
    { symbol: '+2', color: 'yellow', isDrawTwo: true },
    {
      symbol: '+4',
      isDrawFour: true,
      isWildCard: true,
      isColorDeclared: false
    }
  ],
  pile: [
    { symbol: '&#8693', color: 'red', isReverseCard: true },
    { number: 2, color: 'red' },
    { symbol: '+2', color: 'red', isDrawTwo: true },
    { number: 7, color: 'red' },
    { number: 3, color: 'red' },
    { number: 3, color: 'green' },
    { number: 5, color: 'green' }
  ],
  playersCount: '2',
  gameKey: 1551463509642,
  status: true,
  runningColor: 'green',
  cardsToDraw: 1,
  hasDrawnTwo: true,
  hasDrawnFour: true
};

module.exports = {
  sevenCards,
  twoCards,
  dummyShuffler,
  numberDeck,
  tenCards,
  twelveCards,
  gameData
};
