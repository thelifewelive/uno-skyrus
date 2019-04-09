class HardAi {
  constructor(
    name,
    id,
		game,
    cards = [],
    playableCards = [],
    canDrawCard = true,
    unoCallStatus = false,
    hasCaught = false
  ) {
    this.name = name;
    this.cards = cards;
    this.id = id;
    this.hasCaught = hasCaught;
    this.playableCards = playableCards;
    this.canDrawCard = canDrawCard;
    this.unoCallStatus = unoCallStatus;
		this.game = game;
  }

	/*
		The main function of the ai.
		Everything here will be running on the server
		if the ai is on the turn.
	*/
	move(){

		//TODO: write the greedy ai behavior
    if(this.getPlayableCards().length > 0){

      if(this.cards.length != 1){
        var card = this.getBestCard();
        if(card.isWildCard){
          this.throwWildCard(card, false, this.getBestColor());
        }else{
          this.throwCard(card, false);
        }
      }else{
        var card = this.getBestCard();
        if(card.isWildCard){
          this.throwWildCard(card, true, this.getBestColor());
        }else{
          this.throwCard(card, true);
        }
      }

    }else{
      this.drawCard();
    }

	}

	/*
		This function makes the ai to throw a card.
	*/
	throwCard(card, uno){
		this.game.aiThrowCard(this, card, uno);
	}

  throwWildCard(card,uno,color){
    this.game.aiThrowCard(this, card, uno);
    this.game.updateRunningColor(this.id, color);
  }
	/*
		This function makes the ai to draw cards.
	*/
  drawCard(){
		this.game.aiDrawCards(this);
	}

  getBestCard(){
    var bestCard = this.playableCards[0];
    for(var i = 1; i < this.playableCards.length; i++){
      if(this.playableCards[i].getScore() > bestCard.getScore()){
        bestCard=this.playableCards[i];
      }
    }
    return bestCard;
  }

  getBestColor(){
    //red, green, blue, yellow
    var colors = [0, 0, 0, 0];
    for(var i = 0; i < this.cards.length; i++){
      switch(this.cards[i].color){
        case "red": colors[0]++; break;
        case "green": colors[1]++; break;
        case "blue": colors[2]++; break;
        case "yellow": colors[3]++; break;
      }
    }
    var max = 0;
    for(var i = 0; i < colors.length; i++){
      if(colors[i] > max){
        max = i;
      }
    }
    return colors[max];
  }

  getCards() {
    return this.cards;
  }

  setDrawCardStatus(status) {
    this.canDrawCard = status;
  }

  getDrawCardStatus() {
    return this.canDrawCard;
  }

  addCards(cards) {
    this.cards = this.cards.concat(cards);
  }

  addCard(card) {
    this.cards.push(card);
  }

  getCardsCount() {
    return this.cards.length;
  }

	equalCards(card1, card2){
		const type1 = card1.constructor.name;
		const type2 = card2.constructor.name;
		//If the class names are same
		if(type1 == type2){
			//If both wild card
			if(type1 == "WildCard"){
				return true;
			}
			//If both draw four
			if(type1 == "WildDrawFour"){
				return true;
			}
			//If both draw Draw
			if(type1 == "DrawTwo"){
				if(card1.getColor() == card2.getColor()){
					return true;
				}
				return false;
			}
			//If both skip
			if(type1 == "SkipCard"){
				if(card1.getColor() == card2.getColor()){
					return true;
				}
				return false;
			}
			//If both reverse
			if(type1 == "ReverseCard"){
				if(card1.getColor() == card2.getColor()){
					return true;
				}
				return false;
			}
			//If both numbered
			if(type1 == "NumberedCard"){
				if(card1.getColor() == card2.getColor()){
					if(card1.getScore() == card2.getScore()){
						return true;
					}else{
						return false;
					}
				}
			}
		}else{
			return false;
		}
	}

  removeCard(card) {
    const temp = [];
		for(var i = 0; i < this.cards.length; i++){
			if(!this.equalCards(this.cards[i], card)){
				temp.push(this.cards[i]);
			}
		}
		this.cards = temp;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  calculatePlayableCards(otherCard, runningColor, hasDrawnTwo, hasDrawnFour) {
    this.playableCards = this.cards.filter(card => {
      return card.canPlayOnTopOf(
        otherCard,
        runningColor,
        hasDrawnTwo,
        hasDrawnFour,
        false
      );
    });

    const hasNoPlayableCard = this.playableCards.length === 0;

    this.playableCards = this.cards.filter(card => {
      return card.canPlayOnTopOf(
        otherCard,
        runningColor,
        hasDrawnTwo,
        hasDrawnFour,
        hasNoPlayableCard
      );
    });
  }

  hasWon() {
    if (!this.cards.length) {
      return true;
    }
    return false;
  }

  setPlayableCards(cards) {
    this.playableCards = cards;
  }

  getPlayableCards() {
    return this.playableCards;
  }

  setUnoCall(hasCalledUno) {
    if (hasCalledUno && this.cards.length == 1) {
      this.unoCallStatus = true;
    }
  }
  resetUnoCall() {
    this.unoCallStatus = false;
  }

  setHasCaught() {
    this.hasCaught = true;
  }

  resetHasCaught() {
    this.hasCaught = false;
  }

  getUnoCallStatus() {
    return this.unoCallStatus;
  }
}

module.exports = { HardAi };
