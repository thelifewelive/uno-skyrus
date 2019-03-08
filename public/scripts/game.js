/* globals createCard */
/*eslint no-unused-vars: "off"*/

const OTHERS_CARDS_LIMIT = 3;
let calledUno = false;
let numberOfPlayers;

const leaveGame = function() {
  fetch('/leaveGame').then(res => {
    window.location.href = '/';
  });
};

const removePass = function(document) {
  const pass = document.getElementById('passTurn');
  pass.style.visibility = 'hidden';
};

const pass = function() {
  fetch('/passTurn').then(() => removePass(document));
};

const displayPass = function(document) {
  const pass = document.getElementById('passTurn');
  pass.style.visibility = 'visible';
};

const drawCard = function(document) {
  fetch('/drawCard')
    .then(response => {
      return response.json();
    })
    .then(cardDetails => {
      initializeHand(document, cardDetails);
      if (cardDetails.playableCards.length) {
        displayPass(document);
        return;
      }
    });
};

const displayTopDiscard = function(document, card) {
  const pile = document.getElementById('pile');
  pile.innerHTML = '';
  pile.append(createCard(document, card));
  if (card.isWildCard && !card.isColorDeclared) {
    document.getElementById('wildCardOverlay').className = 'overlay visible';
  }
  if(card.isWildCard && card.isColorDeclared){
    document.getElementById('wildCardOverlay').className = 'overlay hidden';
  }
};

const hasSameColor = (card1, card2) => card1.color == card2.color;

const isNumberCardSimilar = (card1, card2) =>
  !isNaN(card1.number) &&
  !isNaN(card2.number) &&
  (card1.number == card2.number && hasSameColor(card1, card2));

const isReverseCardSimilar = (card1, card2) =>
  card1.isReverseCard && card2.isReverseCard && hasSameColor(card1, card2);

const isDrawTwoCardSimilar = (card1, card2) =>
  card1.isDrawTwo && card2.isDrawTwo && hasSameColor(card1, card2);

const isSkipCardSimilar = (card1, card2) =>
  card1.isSkipCard && card2.isSkipCard && hasSameColor(card1, card2);

const isWildCardSimilar = (card1, card2) =>
  card1.isWildCard && card2.isWildCard && card1.isDrawFour == card2.isDrawFour;

const isSimilarCards = function(card1, card2) {
  return (
    isWildCardSimilar(card1, card2) ||
    isReverseCardSimilar(card1, card2) ||
    isDrawTwoCardSimilar(card1, card2) ||
    isSkipCardSimilar(card1, card2) ||
    isNumberCardSimilar(card1, card2)
  );
};

const hasCard = (playableCards, card) => {
  return playableCards.some(playableCard => {
    return isSimilarCards(playableCard, card);
  });
};

const displayLog = function(document, log) {
  const status = document.getElementById('statusBar');
  status.innerHTML = log;
};

const setCardAttributes = function(cardView, playableCards, card) {
  let className = 'non-playable-card';
  if (hasCard(playableCards, card)) {
    cardView.setAttribute('draggable', 'true');
    cardView.setAttribute('ondragstart', 'drag(event)');
    className = 'highlight-playable-card';
  }
  cardView.classList.add(className);
  return cardView;
};

const initializeHand = function(document, { cards, playableCards }) {
  const hand = document.getElementById('myHand');
  hand.innerHTML = '';
  cards.forEach((card, cardId) => {
    let cardView = createCard(document, card, cardId);
    const styledCard = setCardAttributes(cardView, playableCards, card);
    hand.append(styledCard);
  });
};

const catchPlayer = function() {
  fetch('/catch', {
    method: 'GET'
  });
};

const setUno = function() {
  calledUno = true;
};

const allowDrop = function(event) {
  event.preventDefault();
};

const drag = function(event) {
  event.dataTransfer.setData('text', event.target.id);
};

const isWildCard = cardId => {
  return cardId.startsWith('wild');
};

const throwCard = function(document, cardId) {
  if (isWildCard(cardId)) {
    document.getElementById('wildCardOverlay').className = 'overlay visible';
  }

  fetch('/throwCard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cardId, calledUno })
  }).then(() => {
    fetchCards(document);
  });
};

const drop = function(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData('text');
  if (cardId != 'stack') {
    throwCard(document, cardId);
    disableGameElements();
  }
};

const drawDrop = function(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData('text');
  if (cardId == 'stack') {
    drawCard(document);
  }

  disableGameElements();
};

const fetchCards = function(document) {
  fetch('/playerCards')
    .then(response => response.json())
    .then(cards => {
      initializeHand(document, cards);
    });
};

const hideCards = function(hand, cardsCount) {
  let cardsToHide = cardsCount;
  for (let count = OTHERS_CARDS_LIMIT - 1; count >= 0; count--) {
    let visibility = 'visible';
    if (cardsToHide > 0) {
      visibility = 'hidden';
    }
    hand[count].style.visibility = visibility;
    cardsToHide--;
  }
};

const updateOthersCards = function(document, id, cardsCount) {
  const hand = document.getElementById(`player${id}Hand`).children;
  if (cardsCount <= OTHERS_CARDS_LIMIT) {
    const cardsToHide = OTHERS_CARDS_LIMIT - cardsCount;
    hideCards(hand, cardsToHide);
  }
};

const getNamesInOrder = function(playerNames, playerPosition) {
  const namesBeforeMe = playerNames.slice(0, playerPosition);
  const namesAfterMe = playerNames.slice(playerPosition);
  const detailsInOrder = namesAfterMe.concat(namesBeforeMe);
  return detailsInOrder;
};

const updateNamesAndClasses = function(document, id, name, isCurrent) {
  document.getElementById(`player${id}`).innerText = name;

  let className = 'non-current-player';
  let handClassName = 'other-hand';
  if (isCurrent) {
    handClassName = 'other-hand current-hand';
    className = 'current-player';
  }
  document.getElementById(`player${id}-arrow`).className = className;
  if (id !== 1)
    document.getElementById(`player${id}Hand`).className = handClassName;
};

const updatePlayersDetails = function(document, playerDetails, playerPosition) {
  const detailsInOrder = getNamesInOrder(playerDetails, playerPosition);
  if (detailsInOrder[0].isCurrent) {
    enableDraggableElements(document);
  }
  let id = 1;
  detailsInOrder.forEach(({ name, isCurrent, cardsCount }) => {
    updateNamesAndClasses(document, id, name, isCurrent);

    if (id !== 1) {
      updateOthersCards(document, id, cardsCount);
    }
    id++;
  });
};

const getPlayerDetails = document => {
  fetch('/getPlayerNames')
    .then(response => response.json())
    .then(players => {
      const { playerDetails, playerPosition } = players;
      updatePlayersDetails(document, playerDetails, playerPosition);
    });
};

const enableDraggableElements = function(document) {
  const hand = document.getElementById('myHand');
  hand.setAttribute('ondragover', 'allowDrop(event)');
  hand.setAttribute('ondrop', 'drawDrop(event)');

  const stack = document.getElementById('stack');
  stack.setAttribute('draggable', 'true');
  stack.setAttribute('ondragstart', 'drag(event)');
};

const disableGameElements = function() {
  removePass(document);
  const stack = document.getElementById('stack');
  stack.setAttribute('draggable', 'false');
};

const displayVictory = function(document, status) {
  if (status.hasWon) {
    document.getElementById('gameEnd').className = 'overlay visible';
    document.getElementById('popupMessage').innerText = `${
      status.name
    } Has Won The Game`;
  }
};

const changeGamePage = function(document, playersCount) {
  if (numberOfPlayers != playersCount) {
    numberOfPlayers = playersCount;
    window.location.href = '/game';
  }
};

const getGameStatus = function(document) {
  fetch('/gameStatus')
    .then(response => response.json())
    .then(gameStatus => {
      displayLog(document, gameStatus.gameLog);
      displayTopDiscard(document, gameStatus.topDiscard);
      displayVictory(document, gameStatus.victoryStatus);
      updateRunningColor(document, gameStatus.runningColor);
      updateSaveStatus(document, gameStatus.saveStatus);
      changeGamePage(document, gameStatus.playersCount);
    });
};

const updateSaveStatus = function(document, saveStatus) {
  if (saveStatus.status) {
    const saveDetailsView = document.getElementById('saveDetails');

    const saveData = `The game was saved by Game Id ${
      saveStatus.gameKey
    } and Player Id ${saveStatus.playerId} at ${saveStatus.lastSaved}`;
    saveDetailsView.innerText = saveData;
  }
};

const updateRunningColor = function(document, color) {
  const runningColorDiv = document.getElementById('runningColorDiv');
  runningColorDiv.className = `running-color ${color}`;
};

const hidePopUp = function() {
  const wildCardOverlay = document.getElementById('wildCardOverlay');
  wildCardOverlay.className = 'overlay hidden';
};

const declareRunningColor = function() {
  const declaredColor = event.target.classList[0];
  fetch('/updateRunningColor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ declaredColor })
  }).then(() => hidePopUp());
};

/*
	This is the chat listener function.
	It updates the chat panel with the messages.
*/
const chatListener = function (document){
	fetch('/serveChat')
      .then(response => response.json())
      .then(chat => {
        var chatArray = chat;
		const panel = document.getElementById("ChatTable");

		if(chatArray.length == 0){
			//No messages yet.
			panel.innerHTML = '<tr><td style="text-align: center">** No messages yet **</td></tr>';
		}else{
			//There is at least one message.
			var i;
			var panelHTML = constHTML = '<thead><tr><td width="20%" ></td><td  ></td></tr></thead>';
			for(i = 0; i < chatArray.length; i++){

				if((i%2) == 0){
					panelHTML += '<tr><td class="w3-text-blue w3-tiny" ><b>' + chatArray[i].from + ': </b></td><td >' + chatArray[i].msg + '</td></tr>';
				}else{
					panelHTML += '<tr><td class="w3-text-red w3-tiny" ><b>' + chatArray[i].from + ': </b></td><td>' + chatArray[i].msg + '</td></tr>';
				}
			}
			panel.innerHTML = panelHTML;
		}
      });
};

const handleChatAdd = function (){
	var input = document.getElementById('usermsg');
	var msg = document.getElementById('usermsg').value;
	if(msg == ""){
		//Check if the input is empty
		input.placeholder = "You have to fill the field!";
	}else{
		var messageObject = {text: msg};
		fetch('/addChat',{
			method: 'post',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(messageObject)
		});
	}
	input.value = "";
};

const initialize = function(document) {
  setInterval(() => {
    getGameStatus(document);
    fetchCards(document);

	chatListener(document);

    const pile = document.getElementById('pile');
    pile.setAttribute('ondrop', 'drop(event)');

    pile.setAttribute('ondrop', 'drop(event)');
    pile.setAttribute('ondragover', 'allowDrop(event)');
    getPlayerDetails(document);
  }, 1000);
  fetch('/playersCount')
    .then(res => res.json())
    .then(json => {
      numberOfPlayers = json.playersCount;
    });
  removePass(document);
};

const saveGame = function() {
  fetch('/saveGame');
};

window.onload = initialize.bind(null, document);
