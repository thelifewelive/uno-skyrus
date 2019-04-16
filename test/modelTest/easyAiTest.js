const { EasyAi } = require('../../src/models/EasyAi');
const { Game } = require('../../src/models/game.js');
const { Player } = require('../../src/models/player.js');
const { Players } = require('../../src/models/players.js');
const {
  twoCards,
  dummyShuffler,
  numberDeck,
  twelveCards,
  tenCards,
  sevenCards
} = require('../testHelpers/testHelpers.js');
const {
  SkipCard,
  WildCard,
  NumberedCard,
  DrawTwo,
  ReverseCard,
  WildDrawFour
} = require('./../../src/models/card');
const chai = require('chai');

describe('Easy Ai class', () => {
  describe('randomCard', function(){
    it('should get a random card', function(){
      const easyAi = new EasyAi('Martin - Computer');
      const cards = [
        { number: 1, color: 'red' },
        { number: 2, color: 'green' }
      ];
      easyAi.playableCards=cards;
      const actualOutput = easyAi.getRandomCard();
      const expectedOutput1 = { number: 1, color: 'red' };
      const expectedOutput2 = { number: 2, color: 'green' };
      if(actualOutput.number == cards[0].number){
        chai.assert.deepEqual(actualOutput, expectedOutput1);
      }else{
        chai.assert.deepEqual(actualOutput, expectedOutput2);
      }
    });
  });

  describe('randomColor', function(){
    it('should get a random card color', function(){
      const easyAi = new EasyAi('Martin - Computer');
      const actualOutput = easyAi.getRandomColor();
      if(actualOutput == "red"){
        chai.assert.deepEqual(actualOutput, "red");
      }else if(actualOutput == "green"){
        chai.assert.deepEqual(actualOutput, "green");
      }else if(actualOutput == "blue"){
        chai.assert.deepEqual(actualOutput, "blue");
      }else{
        chai.assert.deepEqual(actualOutput, "yellow");
      }
    });
  });
});
