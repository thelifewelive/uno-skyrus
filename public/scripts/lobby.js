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

/*--------selected logs for the notif.bar--------------*/
const snackB = function (document,log) {
  const snackStatus = generateLogForSnack(log);
  document.getElementById('snackBar').innerHTML='';
  document.getElementById('snackBar').appendChild(snackStatus);
};
function changeVisibility() {
  var s = document.getElementById("snackBar");
  if (s.style.display === "none") {
      s.style.display = "block";
  }   
      else {
      s.style.display = "none";
      } 
}
/*-----------------------------------------------*/
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
        /*-------------add the SnackB------------*/
        snackB(document,json.status);   
      });
  }, 1000);
};

const leaveGame = function() {
  fetch('/leaveGame').then(res => {
    window.location.href = '/';
  });
};

//ADD ARTIFICIAL INTELLIGENCE AS A COMPUTER TO THE GAME
const addAIEasy = function() {
	fetch('/addAiEasy');
	document.execCommand('addAIEasy');
};

const addAIHard = function() {
	fetch('/addAiHard');
	document.execCommand('addAIHard');
};

const removeAI = function() {
	fetch('/removeAi');
	document.execCommand('removeAI');
};
//-----------------------------------------------------

window.onload = () => {
  document.getElementById('copyBtn').onclick = copy;

  //ADDED BUTTONs LISTENER ------------------------
  document.getElementById('addAiEasy').onclick = addAIEasy;
	document.getElementById('addAiHard').onclick = addAIHard;
	document.getElementById('removeAi').onclick = removeAI;
  //----------------------------------------------
  getPlayersStatus(document);
};
