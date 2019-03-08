const fs = require('fs');

const { generateGameKey, writeData, loadData } = require('../utils/util.js');
const { Player } = require('../models/player');
const { Game } = require('../models/game');
const { createDeck } = require('../models/deck');
const { Players } = require('../models/players.js');
const ld = require('lodash');
const { ActivityLog } = require('./../models/activityLog');
const {URLS} = require('../constants.js');

const LOBBY = fs.readFileSync('./public/lobby.html', 'utf8');
const SYMBOLS = {
  skipCard: '&#8856;'
};

const hostGame = function(req, res) {
  const gameKey = generateGameKey();
  const { hostName, totalPlayers } = req.body;
  const id = generateGameKey();
  const host = new Player(hostName, id);
  const players = new Players(host);
  const deck = createDeck(SYMBOLS.skipCard);
  const activityLog = new ActivityLog([`Game created by ${hostName}`]);
  const game = new Game(deck, totalPlayers, gameKey, players, activityLog);

  req.app.games.addGame(game, gameKey);

  res.cookie('gameKey', gameKey);
  res.cookie('id', id);
  res.redirect(302, '/lobby');
  res.end();
};

const validateGameKey = function(req, res) {
  const { gameKey } = req.body;
  const games = req.app.games;
  if (!games.doesGameExist(gameKey)) {
    res.send({
      doesGameExist: false
    });
    return;
  }
  res.send({
    doesGameExist: true
  });
};

const joinGame = function(req, res) {
  const { playerName, gameKey } = req.body;
  const games = req.app.games;
  const game = games.getGame(gameKey);
  const id = generateGameKey();
  if (!game.hasStarted()) {
    const player = new Player(playerName, id);
    game.addPlayer(player);
  }
  res.cookie('gameKey', gameKey);
  res.cookie('id', id);
  res.send({ hasGameStarted: game.hasStarted() });
};

const servePlayerCards = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const cards = game.getPlayerCards(+id);
  const player = game.getPlayers().getPlayer(id);
  let playableCards = [];

  if (
    game
      .getPlayers()
      .getCurrentPlayer()
      .getId() == id
  ) {
    playableCards = player.getPlayableCards();
  }
  res.send({
    cards,
    playableCards
  });
};

const haveAllPlayersJoined = function(game) {
  const joinedPlayers = game.getPlayers().getNumberOfPlayers();
  const playersCount = game.getPlayersCount();

  return joinedPlayers == playersCount;
};

const handleGame = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const playersCount = game.playersCount;
  const status = game.activityLog.getLatestLog();

  if (haveAllPlayersJoined(game)) {
    if (!game.hasStarted()) {
      game.startGame(ld.shuffle);
    }

    res.redirect('/game');
    res.end();
    return;
  }
  const extractPlayersNames = function(game) {
    const players = game.getPlayers().getPlayers();
    return players.map(player => player.getName());
  };
  const playersNames = extractPlayersNames(game);
  const playersDetails = {
    playersCount,
    playersNames
  };
  res.send({playersDetails, status});
};

const serveLobby = function(req, res) {
  const { gameKey } = req.cookies;
  const modifiedLobby = LOBBY.replace('__gameKey__', gameKey);
  res.send(modifiedLobby);
  res.end();
};

const handleThrowCard = function(req, res) {
  const { gameKey, id } = req.cookies;
  const { cardId, calledUno } = req.body;

  const game = req.app.games.getGame(gameKey);
  game.throwCard(id, cardId, calledUno);
  res.end();
};

const drawCard = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);
  const playableCards = game.drawCards(id);
  const stackLength = game.getStack().length;
  if (!stackLength) {
    game.refillStack();
  }
  const cards = game.getPlayerCards(+id);
  res.send({
    cards,
    playableCards
  });
};

const getPlayerNames = (req, res) => {
  const { gameKey, id } = req.cookies;
  const games = req.app.games;
  const game = games.getGame(gameKey);
  const players = game.getPlayers().getPlayers();
  const playerPosition = players.findIndex(player => player.id == id);

  const playerDetails = players.map(player => {
    return {
      name: player.name,
      isCurrent: game.getPlayers().isCurrent(player),
      cardsCount: player.getCardsCount()
    };
  });

  res.send({
    playerDetails,
    playerPosition
  });
};

const renderGamePage = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const playersCount = game.numberOfPlayersJoined;

  const gamePage = fs.readFileSync(
    `./public/${playersCount}player_game.html`,
    'utf8'
  );

  res.send(gamePage);
};

const hasDrawn = function(player) {
  return !player.getDrawCardStatus();
};

const isCurrentPlayer = function(game, player) {
  return game.getPlayers().isCurrent(player);
};

const passTurn = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const player = game.getPlayers().getPlayer(id);

  if (hasDrawn(player) && isCurrentPlayer(game, player)) {
    game.getPlayers().changeTurn();
    game.updatePlayableCards();
  }
  res.end();
};

const serveGameLog = function(game) {
  const latestLog = game.activityLog.getLatestLog();
  return latestLog;
};

const getTopDiscard = function(game) {
  const topDiscard = game.getTopDiscard();
  return topDiscard;
};

const getRunningColor = function(game) {
  const runningColor = game.getRunningColor();
  return runningColor;
};

const serveGameStatus = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);

  const gameLog = serveGameLog(game);
  const topDiscard = getTopDiscard(game);
  const victoryStatus = game.victoryStatus();
  const runningColor = getRunningColor(game);
  const saveStatus = getSaveStatus(game, id);
  const playersCount = game.numberOfPlayersJoined;
  res.send({
    gameLog,
    topDiscard,
    runningColor,
    victoryStatus,
    saveStatus,
    playersCount
  });
};

const updateRunningColor = function(req, res) {
  const { declaredColor } = req.body;
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);
  game.updateRunningColor(id, declaredColor);

  res.end();
};

const saveGame = function(req, res) {
  const { gameKey } = req.cookies;
  const games = res.app.games;
  games.saveGame(writeData.bind(null, fs), gameKey);
  games.getGame(gameKey).updateSaveStatus();
  res.end();
};

const catchPlayer = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);
  game.catchPlayer(id);
  res.end();
};

const loadGame = function(req, res) {
  const { gameKey, id } = req.body;
  const games = req.app.games;
  loadData(fs, gameKey, games.loadGame.bind(games));
  res.cookie('gameKey', gameKey);
  res.cookie('id', id);
  res.redirect('/game');
  res.end();
};

const getSaveStatus = function(game, playerId) {
  const { status, lastSaved } = game.getSaveStatus();
  const saveStatus = {
    status: status
  };
  if (status) {
    saveStatus.lastSaved = lastSaved;
    saveStatus.gameKey = game.getKey();
    saveStatus.playerId = playerId;
  }
  return saveStatus;
};

const leaveGame = function(req, res) {
  const { gameKey, id } = req.cookies;
  const game = res.app.games.getGame(gameKey);
  game.leaveGame(id);
  res.end();
};

const servePlayersCount = function(req, res) {
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  const playersCount = game.numberOfPlayersJoined;
  res.send({ playersCount });
};

const isProhibited  = (game, url) => game.hasStarted() &&  !URLS.includes(url);

const restrictAccess = function(req, res, next){
  const { gameKey } = req.cookies;
  const game = req.app.games.getGame(gameKey);
  if(!game) {
    next();
    return;
  }

  if (isProhibited(game, req.url)) {
    res.redirect('/game');
    return;
  }
  next();  
};

module.exports = {
  hostGame,
  validateGameKey,
  joinGame,
  serveLobby,
  servePlayerCards,
  handleGame,
  handleThrowCard,
  getPlayerNames,
  drawCard,
  serveGameStatus,
  renderGamePage,
  passTurn,
  updateRunningColor,
  saveGame,
  catchPlayer,
  loadGame,
  leaveGame,
  servePlayersCount,
  restrictAccess
};
