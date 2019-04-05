/* globals createPlayerCard */
/*eslint no-unused-vars: "off"*/

const copy = function() {
  const copyText = document.getElementById('gameKey');
  copyText.select();
  document.execCommand('copy');
};

const createPlayerDiv = function(document, playerName) {
  const card = createPlayerCard(document, playerName);
  return card;
};

const createPlayersView = function(document, playersCount, playersNames) {
  const playersContainer = document.getElementById('players');
  playersContainer.innerText = '';

  let count = 0;
  while (count < playersCount) {
    const playerDiv = createPlayerDiv(document, playersNames[count]);
    playersContainer.appendChild(playerDiv);
    count++;
  }
};

const showStatus = function(document, log) {
  // eslint-disable-next-line no-undef
  const status = generateStatusLog(log);
  document.getElementById('statusBar').innerHTML = '';
  document.getElementById('statusBar').appendChild(status);
};

const getPlayersStatus = function(document) {
  setInterval(() => {
    fetch('/playersStatus')
      .then(response => {
        if (response.redirected) {
          window.location.replace(response.url);
        }
        return response.json();
      })
      .then(json => {
        createPlayersView(
          document,
          json.playersDetails.playersCount,
          json.playersDetails.playersNames
        );
        showStatus(document, json.status);
      });
  }, 1000);
};

const leaveGame = function() {
  fetch('/leaveGame').then(res => {
    window.location.href = '/';
  });
};

//ADD ARTIFICIAL INTELLIGENCE AS A COMPUTER TO THE GAME
const addAI = function() {
	fetch('/addAi');
	document.execCommand('addAI');
};

const removeAI = function() {
	fetch('/removeAi');
	document.execCommand('removeAI');
};
//-----------------------------------------------------

window.onload = () => {
  document.getElementById('copyBtn').onclick = copy;

  //ADDED BUTTONs LISTENER ------------------------
  document.getElementById('addAi').onclick = addAI;
	document.getElementById('removeAi').onclick = removeAI;
  //----------------------------------------------

	showAiButton();
  getPlayersStatus(document);
};
