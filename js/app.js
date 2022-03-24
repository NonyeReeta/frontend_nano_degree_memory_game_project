/*
 * Create a list that holds all of your cards
 */

const cards = document.querySelectorAll(".card");
const cardsList = [...cards];
const movesEl = document.querySelector(".moves");

let moves = 0;
movesEl.innerHTML = moves;

const stars = document.querySelectorAll(".fa-star");
// function to hide cards
const hideCards = function () {
  for (const deck of cardsList) {
    deck.classList.remove("open", "show");
  }
};

// Display the cards on the page
for (const deck of cardsList) {
  deck.classList.add("open", "show");
  setTimeout(hideCards, 1000);
}

// shuffle the list of cards
const shuffledCards = shuffle([...cards]);
const shuffledCardsList = [];

// loop through each card and create its HTML add each card's HTML to the page
for (let i = 0; i < shuffledCards.length; i++) {
  shuffledCardsList.push(shuffledCards[i].firstElementChild.className);
}
for (let i = 0; i < cardsList.length; i++) {
  cardsList[i].firstElementChild.className = shuffledCardsList[i];
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// function to display the card symbol
function displaySymbol(card) {
  card.classList.add("open", "show");
}

// function to add opened cards to a list
let openCardList = [];
function addToOpenList(card) {
  openCardList.push(card.firstElementChild.className);
}

// function to lock cards in open position
const lockOpen = function (cards) {
  for (const card of cards) {
    card.classList.add("open", "show", "match");
    openCardList = [];
    cardEls = [];
  }
};

// function to animate unmatched cards
const animateCards = function (cards) {
  for (const card of cards) {
    card.classList.add("shake");
  }
};

// function to remove card from list and hide card symbol
const hideSymbol = function (cards) {
  for (const card of cards) {
    card.style.pointerEvents = "auto";
    card.classList.remove("open", "show", "match", "shake");
    openCardList = [];
    cardEls = [];
  }
};

// function to increase moves counter
const increaseCounter = function () {
  moves++;
  movesEl.textContent = moves;
};

let cardEls = [];
let count = 3;
const matchedCards = [];

// function to load lost page
const openLost = function () {
  location.href = "lost.html";
};

// function to load win page
const openWin = function () {
  location.href = "win.html";
};

for (const card of cardsList) {
  card.addEventListener("click", function () {
    displaySymbol(card);
    addToOpenList(card);
    cardEls.push(card);
    // check if two cards are open
    if (openCardList.length > 1) {
      increaseCounter();
      // check if the 2 opened cards match
      if (openCardList[0] == openCardList[1]) {
        matchedCards.push([cardEls[0], cardEls[1]]);
        lockOpen([cardEls[0], cardEls[1]]);
        // check for win sceneria
        if (matchedCards.length == 8) {
          setTimeout(openWin, 1500);
        }
        // else statement for when the two open cards dont match
      } else {
        animateCards(cardEls);
        setTimeout(hideSymbol, 1000, cardEls);
        // hide the cards then decrease the stars(life)
        stars[count - 1].classList.remove("fa-star");
        stars[count - 1].classList.add("fa-star-o");
        count--;
        // check if count = 0, then game over
        if (count == 0) {
          setTimeout(openLost, 1500);
        }
      }
    }
  });
}

// winning functionality
// for (const card of cardsList) {
//   if (card.classList.contains("open", "show", "match")) {
//     console.log("you win");
//   }
// }

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
