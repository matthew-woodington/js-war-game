const player1CardDisplay = document.querySelector(".player1-card");
const player2CardDisplay = document.querySelector(".player2-card");
const player1DeckDisplay = document.querySelector(".player1-deck");
const player2DeckDisplay = document.querySelector(".player2-deck");
const gameDisplay = document.querySelector(".game-info");
const drawButton = document.querySelector(".draw");
const newGameButton = document.querySelector(".new-game");

gameDisplay.innerHTML = "Click New Game to Start!";

var isTie = false;
let tieCards1 = [];
let tieCards2 = [];
let tiePot = [];

const cardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const Player = function ({ name } = {}) {
  this.name = name;
  this.hand = [];
  this.activeCard = {};
};

const Card = function ({ suit, value }) {
  this.suit = suit;
  this.value = value;
};

const Deck = function () {
  this.cards = [];
  const suits = ["♥", "♦", "♠", "♣"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      this.cards.push(new Card({ value: values[j], suit: suits[i] }));
    }
  }
  console.log(this.cards);
};

const Game = function () {
  this.player1 = new Player({ name: "Player1" });
  this.player2 = new Player({ name: "Player2" });

  this.deck = new Deck();
  console.log(this.deck);
};
Game.prototype.shuffle = function () {
  this.deck.cards.sort((a, b) => Math.random() - 0.5);
};

Game.prototype.deal = function () {
  this.player1.hand = this.deck.cards.slice(0, 50);
  this.player2.hand = this.deck.cards.slice(50);

  // for (let i = 0; i < this.deck.cards.length; i += 2) {
  //   this.player1.hand.push(this.deck.cards[i]);
  //   this.player2.hand.push(this.deck.cards[i + 1]);
  // }
};

Game.prototype.flipCard = function () {
  this.player1.activeCard = this.player1.hand.pop();
  this.player2.activeCard = this.player2.hand.pop();

  console.log(this.player1.activeCard);
  console.log(this.player2.activeCard);
};

Game.prototype.updateDisplay = function () {
  player1CardDisplay.innerHTML = `${this.player1.activeCard.value}${this.player1.activeCard.suit}`;
  player2CardDisplay.innerHTML = `${this.player2.activeCard.value}${this.player2.activeCard.suit}`;
};

Game.prototype.updateDeckValue = function () {
  player1DeckDisplay.innerHTML = this.player1.hand.length;
  player2DeckDisplay.innerHTML = this.player2.hand.length;
};

Game.prototype.isWinner = function () {
  if (this.player1.hand.length === 0) {
    gameDisplay.innerHTML = "Player2 Wins Game!";
    player1DeckDisplay.innerHTML = "☹";
    player1CardDisplay.innerHTML = "";
    player2CardDisplay.innerHTML = "";
    player2DeckDisplay.innerHTML = "☺";
  } else if (this.player2.hand.length === 0) {
    gameDisplay.innerHTML = "Player1 Wins Game!";
    player1DeckDisplay.innerHTML = "☺";
    player1CardDisplay.innerHTML = "";
    player2CardDisplay.innerHTML = "";
    player2DeckDisplay.innerHTML = "☹";
  } else if (this.player1.hand.length > 0 || this.player1.hand.length > 0) {
    return;
  }

  if (
    cardValues[this.player1.activeCard.value] >
    cardValues[this.player2.activeCard.value]
  ) {
    gameDisplay.innerHTML = "Player1 Wins!";
    this.player1.hand.unshift(this.player1.activeCard);
    this.player1.hand.unshift(this.player2.activeCard);
  } else if (
    cardValues[this.player2.activeCard.value] >
    cardValues[this.player1.activeCard.value]
  ) {
    gameDisplay.innerHTML = "Player2 Wins!";
    this.player2.hand.unshift(this.player1.activeCard);
    this.player2.hand.unshift(this.player2.activeCard);
  } else if (
    cardValues[this.player1.activeCard.value] ===
    cardValues[this.player2.activeCard.value]
  ) {
    gameDisplay.innerHTML = "It's a Tie!";
    if (this.player1.hand.length <= 4 || this.player2.hand.length <= 4) {
      this.player1.hand.unshift(this.player1.activeCard);
      this.player2.hand.unshift(this.player2.activeCard);
    } else {
      isTie = true;
      game.tieBreak();
    }
  }
  console.log(this.player1.hand, this.player2.hand);
};

Game.prototype.tieBreak = function () {
  tieCards1 = this.player1.hand.splice(-3);
  tieCards2 = this.player2.hand.splice(-3);
  tiePot = tieCards1.concat(tieCards2);
  tiePot.push(this.player1.activeCard, this.player2.activeCard);

  alert(
    `Tiebreaker Pot Active: last turn's cards as well as three extra cards each are on the line this next turn!`
  );

  console.log(tiePot);
  isTie = true;
};

Game.prototype.addTieWinner = function () {
  if (
    cardValues[this.player1.activeCard.value] >
    cardValues[this.player2.activeCard.value]
  ) {
    gameDisplay.innerHTML = "Player1 Wins Tiebreak!";
    this.player1.hand.unshift(this.player1.activeCard);
    this.player1.hand.unshift(this.player2.activeCard);
    this.player1.hand = this.player1.hand.concat(tiePot);
  } else if (
    cardValues[this.player2.activeCard.value] >
    cardValues[this.player1.activeCard.value]
  ) {
    gameDisplay.innerHTML = "Player2 Wins Tiebreak!";
    this.player2.hand.unshift(this.player1.activeCard);
    this.player2.hand.unshift(this.player2.activeCard);
    this.player1.hand = this.player2.hand.concat(tiePot);
  } else if (
    cardValues[this.player1.activeCard.value] ===
    cardValues[this.player2.activeCard.value]
  ) {
    gameDisplay.innerHTML = "It's a Tie!";
    game.tieBreak();
  }

  console.log(this.player1.hand, this.player2.hand);

  isTie = false;
};

// Game.prototype.checkWinner = function () {
//   if (this.player1.hand.length > 0 || this.player1.hand.length > 0) {
//     return;
//   } else if (this.player1.hand.length === 0) {
//     gameDisplay.innerHTML = "Player2 Wins Game!";
//     player1DeckDisplay.innerHTML = "☹";
//     player1CardDisplay.innerHTML = "";
//     player2CardDisplay.innerHTML = "";
//     player2DeckDisplay.innerHTML = "☺";
//   } else if (this.player2.hand.length === 0) {
//     gameDisplay.innerHTML = "Player1 Wins Game!";
//     player1DeckDisplay.innerHTML = "☺";
//     player1CardDisplay.innerHTML = "";
//     player2CardDisplay.innerHTML = "";
//     player2DeckDisplay.innerHTML = "☹";
//   }
// };

Game.prototype.startGame = function () {
  game.shuffle();
  game.deal();
};

Game.prototype.reset = function () {
  this.player1.hand = [];
  this.player2.hand = [];

  player1CardDisplay.innerHTML = "";
  player2CardDisplay.innerHTML = "";

  player1DeckDisplay.innerHTML = "";
  player2DeckDisplay.innerHTML = "";
};

const game = new Game();
// game.shuffle();
// game.deal();
// game.flipCard();
// game.updateDisplay();
// game.updateDeckValue();
// game.isWinner();

console.log(game);

newGameButton.addEventListener("click", () => {
  game.reset();

  game.startGame();

  gameDisplay.innerHTML = "Draw Cards!";
});

drawButton.addEventListener("click", () => {
  if (isTie === false) {
    game.flipCard();
    game.updateDisplay();
    game.updateDeckValue();
    game.isWinner();
  } else if (isTie !== false) {
    game.flipCard();
    game.addTieWinner();
    game.updateDisplay();
    game.updateDeckValue();
  }
});
