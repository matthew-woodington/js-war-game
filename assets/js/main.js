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

///

function Deck(cards = newDeck()) {
  this.cards = cards;
}

const deck = new Deck();
console.log(deck.cards);

///

function Card(suit, value) {
  this.suit = suit;
  this.value = value;
}

///

function newDeck() {
  return suits.flatMap((suit) => {
    return values.map((value) => {
      return new Card(suit, value);
    });
  });
}
