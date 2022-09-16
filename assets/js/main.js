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

let inGame = false;
let isTie = false;
let tiePot = [],
  tieCards1 = [],
  tieCards2 = [];

//// QUERY ////

const player1CardDisplay = document.querySelector(".player1-card");
const player2CardDisplay = document.querySelector(".player2-card");
const player1DeckDisplay = document.querySelector(".player1-deck");
const player2DeckDisplay = document.querySelector(".player2-deck");
const gameDisplay = document.querySelector(".game-info");
const drawButton = document.querySelector(".draw");
const newGameButton = document.querySelector(".new-game");

gameDisplay.innerHTML = "Draw to begin game!";

//// CONSTRUCTORS ////

function Deck(cards = newDeck()) {
  this.cards = cards;
}

Deck.prototype.shuffle = function () {
  this.cards.sort((a, b) => Math.random() - 0.5);
};

function newDeck() {
  return suits.flatMap((suit) => {
    return values.map((value) => {
      return new Card(suit, value);
    });
  });
}

const mainDeck = new Deck();

mainDeck.shuffle();
console.log(mainDeck.cards);

player1Deck = mainDeck.cards.slice(0, 26);
player2Deck = mainDeck.cards.slice(26);

// console.log(player1Deck);
// console.log(player2Deck);

///

function Card(suit, value) {
  this.suit = suit;
  this.value = value;
}

///

function Player(deck = [], card = {}) {
  this.deck = deck;
  this.card = card;
}

let player1 = new Player({
  deck: player1Deck,
});

let player2 = new Player({
  deck: player2Deck,
});

function Game(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
}

const game = new Game();

Game.prototype.playGame = function () {
  if ((inGame = false)) {
    startGame();
  }
  if ((inGame = true)) {
    flipCard();
  }
};

//// ---- ////

drawButton.addEventListener("click", () => {
  game.playGame();
});

function startGame() {
  inGame = true;

  flipCard();
}

function flipCard() {
  activePlayer1Card = player1Deck.pop();
  activePlayer2Card = player2Deck.pop();

  console.log(activePlayer1Card);
  console.log(activePlayer2Card);

  player1CardDisplay.innerHTML = `${this.activePlayer1Card.value}${this.activePlayer1Card.suit}`;
  player2CardDisplay.innerHTML = `${this.activePlayer2Card.value}${this.activePlayer2Card.suit}`;

  updateCardCount();

  // if ((isTie = true)) {
  //   if (winsRound(activePlayer1Card, activePlayer2Card)) {
  //     gameDisplay.innerHTML = "Player1 wins Tie!";
  //     player1Deck.unshift(activePlayer1Card);
  //     player1Deck.unshift(activePlayer2Card);
  //     player1Deck.push(tiePot);
  //   } else if (winsRound(activePlayer2Card, activePlayer1Card)) {
  //     gameDisplay.innerHTML = "Player2 wins Tie!";
  //     player2Deck.unshift(activePlayer1Card);
  //     player2Deck.unshift(activePlayer2Card);
  //     player2Deck.push(tiePot);
  //   }
  //   tie = false;
  // }

  if (winsRound(activePlayer1Card, activePlayer2Card)) {
    gameDisplay.innerHTML = "Player1 wins!";
    player1Deck.unshift(activePlayer1Card);
    player1Deck.unshift(activePlayer2Card);
  } else if (winsRound(activePlayer2Card, activePlayer1Card)) {
    gameDisplay.innerHTML = "Player2 wins!";
    player2Deck.unshift(activePlayer1Card);
    player2Deck.unshift(activePlayer2Card);
  } else {
    gameDisplay.innerHTML = "It's a Tie!";
    player1Deck.unshift(activePlayer1Card);
    player2Deck.unshift(activePlayer2Card);
    // alert("Three cards on the line!");
    // isTie = true;

    // tieCards1 = player1Deck.splice(-3);
    // tieCards2 = player2Deck.splice(-3);

    // tiePot.push(tieCards1, tieCards2);
  }

  if (isGameOver(player1Deck)) {
    gameDisplay.innerHTML = "Game Over! Player2 Wins!";
    player2DeckDisplay.innerHTML = "☺";
    player1DeckDisplay.innerHTML = "☹";
  } else if (isGameOver(player2Deck)) {
    gameDisplay.innerHTML = "Game Over! Player1 Wins!";
    player1DeckDisplay.innerHTML = "☺";
    player2DeckDisplay.innerHTML = "☹";
  }
}
//// ---- ////

// updates the display for each player
function updateCardCount() {
  player1DeckDisplay.innerHTML = player1Deck.length;
  player2DeckDisplay.innerHTML = player2Deck.length;
}

updateCardCount();

// determines round winner, true if player false if computer
function winsRound(card1, card2) {
  return cardValues[card1.value] > cardValues[card2.value];
}

function isGameOver(deck) {
  return deck.length === 0;
}

//// New Game ////

newGameButton.addEventListener("click", () => {
  location.reload();
});
