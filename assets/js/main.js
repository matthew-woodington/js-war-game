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

//// QUERY ////

const playerCardDisplay = document.querySelector(".player-card");
const computerCardDisplay = document.querySelector(".computer-card");
const playerDeckDisplay = document.querySelector(".player-deck");
const computerDeckDisplay = document.querySelector(".computer-deck");
const gameDisplay = document.querySelector(".game-info");
const drawButton = document.querySelector(".draw");

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

const deck = new Deck();

deck.shuffle();
console.log(deck.cards);

playerDeck = deck.cards.slice(0, 26);
computerDeck = deck.cards.slice(26);

console.log(playerDeck);
console.log(computerDeck);

activePlayerCard = playerDeck.pop();
console.log(activePlayerCard);

activeComputerCard = computerDeck.pop();
console.log(activeComputerCard);

playerCardDisplay.innerHTML = `${this.activePlayerCard.value}${this.activePlayerCard.suit}`;
computerCardDisplay.innerHTML = `${this.activeComputerCard.value}${this.activeComputerCard.suit}`;

///

function Card(suit, value) {
  this.suit = suit;
  this.value = value;
}

///

// function Player(name, deck) {
//   this.name = name;
//   this.deck = deck;
// }

///

// function Game({ players, mainDeck }) {
//   this.players = [
//     new Player({ name: "Player" }),
//     new Player({ name: "Computer" }),
//   ];
//   this.mainDeck = mainDeck;
// }
// const mainDeck = new Deck();
// mainDeck.shuffle();
// console.log(mainDeck);

//// ---- ////

// let playerDeck, computerDeck;

// drawButton.addEventListener("click", () => {
//   if ((inGame = false)) {
//     startGame();
//     return;
//   }

//   if ((inGame = true)) {
//     drawCards();
//   }
// });

// function startGame() {
//   const deck = new Deck();
//   deck.shuffle();

//   playerDeck = deck.cards.slice(0, 26);
//   computerDeck = deck.cards.slice(26);
//   inGame = true;
// }

// function drawCards() {
//   const playerCard = playerDeck.pop();
//   const computerCard = computerDeck.pop();

// }

// updates the display for each player
function updateCardCount() {
  playerDeckDisplay.innerHTML = playerDeck.length;
  computerDeckDisplay.innerHTML = computerDeck.length;
}

updateCardCount();

// determines round winner, true if player false if computer
function winsRound(card1, card2) {
  return cardValues[card1.value] > cardValues[card2.value];
}
