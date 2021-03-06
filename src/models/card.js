class Card {}

class NumberedCard extends Card {
  constructor(symbol, color) {
    super();
    this.symbol = symbol;
    this.color = color;
  }

  canPlayOnTopOf(otherCard, runningColor, hasDrawnTwo, hasDrawnFour) {
    const status =
      hasDrawnTwo &&
      hasDrawnFour &&
      (runningColor === this.color || otherCard.symbol === this.symbol);
    return status;
  }

  action(turnDirection, currentPlayerIndex) {
    currentPlayerIndex += turnDirection;
    return { updatedIndex: currentPlayerIndex };
  }

  getColor() {
    return this.color;
  }

  logMessage() {
    return this.symbol + ' ' + this.color;
  }
}

class WildCard extends Card {
  constructor(symbol) {
    super();
    this.symbol = symbol;
    this.isWildCard = true;
    this.isColorDeclared = false;
  }

  action(turnDirection, currentPlayerIndex) {
    this.isColorDeclared = false;
    return { updatedIndex: currentPlayerIndex };
  }

  canPlayOnTopOf(topDiscard, runningColor, hasDrawnTwo, hasDrawnFour) {
    return hasDrawnTwo && hasDrawnFour;
  }

  logMessage() {
    return 'wildcard';
  }

  setColorAsDeclared() {
    this.isColorDeclared = true;
  }
}

class DrawTwo extends Card {
  constructor(symbol, color) {
    super();
    this.symbol = symbol;
    this.color = color;
    this.isDrawTwo = true;
  }

  action(turnDirection, currentPlayerIndex) {
    currentPlayerIndex += turnDirection;
    return { updatedIndex: currentPlayerIndex };
  }

  canPlayOnTopOf(otherCard, runningColor, hasDrawnTwo, hasDrawnFour) {
    const status =
      hasDrawnFour &&
      (runningColor === this.color || otherCard.symbol === this.symbol);
    return status;
  }

  getColor() {
    return this.color;
  }

  logMessage() {
    return this.symbol + ' ' + this.color;
  }
}

class SkipCard extends Card {
  constructor(symbol, color) {
    super();
    this.color = color;
    this.isSkipCard = true;
    this.symbol = symbol;
  }

  action(turnDirection, currentPlayerIndex) {
    currentPlayerIndex += 2 * turnDirection;
    return { updatedIndex: currentPlayerIndex };
  }

  canPlayOnTopOf(topDiscard, runningColor, hasDrawnTwo, hasDrawnFour) {
    return (
      hasDrawnTwo &&
      hasDrawnFour &&
      (runningColor === this.color || topDiscard.isSkipCard)
    );
  }

  logMessage() {
    return `Skip ${this.color}`;
  }

  getColor() {
    return this.color;
  }
}

class ReverseCard extends Card {
  constructor(symbol, color) {
    super();
    this.symbol = symbol;
    this.color = color;
    this.isReverseCard = true;
  }

  getColor() {
    return this.color;
  }

  action(turnDirection, currentPlayerIndex) {
    turnDirection = -turnDirection;
    const updatedIndex = turnDirection + currentPlayerIndex;
    return { turnDirection, updatedIndex };
  }

  logMessage() {
    return `Reverse ${this.color}`;
  }

  canPlayOnTopOf(topDiscard, runningColor, hasDrawnTwo, hasDrawnFour) {
    const status =
      hasDrawnTwo &&
      hasDrawnFour &&
      (runningColor === this.color || topDiscard.isReverseCard);
    return status;
  }
}

class WildDrawFour extends Card {
  constructor(symbol) {
    super();
    this.symbol = symbol;
    this.isDrawFour = true;
    this.isWildCard = true;
    this.isColorDeclared = false;
  }

  action(turnDirection, currentPlayerIndex) {
    this.isColorDeclared = false;
    return { updatedIndex: currentPlayerIndex };
  }

  canPlayOnTopOf(
    topDiscard,
    runningColor,
    hasDrawnTwo,
    hasDrawnFour,
    hasNoPlayableCard
  ) {
    return hasDrawnTwo && hasDrawnFour && hasNoPlayableCard;
  }

  logMessage() {
    return 'Wild Draw Four';
  }

  setColorAsDeclared() {
    this.isColorDeclared = true;
  }
}

module.exports = {
  NumberedCard,
  WildCard,
  SkipCard,
  DrawTwo,
  ReverseCard,
  WildDrawFour
};
