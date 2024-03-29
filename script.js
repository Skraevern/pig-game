"use strict";

// Selekting elements (two types)
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1E1 = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const btnRules = document.querySelector(`.btn--rules`);
const modal = document.getElementById("myModal");
const closeModal = document.getElementsByClassName("close-modal")[0];

let scores;
let currentScore;
let activePlayer;
let playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1E1.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

const biggerDice = function () {
  diceEl.classList.add("bigger-dice");
};

init();

// Rolling dice functionallity
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generating a dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);

    // 2. Dislplay dice
    diceEl.classList.remove(`hidden`);
    diceEl.classList.remove(`bigger-dice`);
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to the current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
      diceEl.classList.add("bigger-dice");
    }
  }
});

// HOLD BUTTON
btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    diceEl.classList.add(`hidden`);
    // 2. If score >=
    if (scores[activePlayer] >= 30) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add(`hidden`);
    } else {
      switchPlayer();
    }
  }
});

// New game button
btnNew.addEventListener(`click`, function () {
  init();
});
// Rules button
btnRules.addEventListener(`click`, function () {
  modal.style.display = "block";
});
closeModal.addEventListener(`click`, function () {
  modal.style.display = "none";
});
