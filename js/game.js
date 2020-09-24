/* eslint-disable prefer-const */
// THE PLAN

// initialize the game
// pick a random letter

// <--HERE-->
// wait for the user to type a key on their keyboard
// check that letter against the random letter the computer chose
// let the user know if they are right or wrong
// -- if wrong we deduct from # of guesses and show them the wrong guess, then render that wrong guess on the screen
// -- if wrong and they don't have any guesses left - show losing message and update the losses + reset/re-initialize the game
// -- if right we show a winning message and update the wins and reset/re-initialize the game

// Game Variables
let wins = 0;
let losses = 0;
let guessesLeft = 10;
let userGuesses = []; // basically need to keep track of a list of all the letters a user has chosen
let randomLetter;
const letters = 'abcdefghijklmnopqrstuvwxyz'.split(''); // generate an array from the string of letters

/**
 * @prop {UI functions}
 *
 *
 * use functions to store code that will manipulate the DOM for you.
 *
 * set the value of the span with id win in our front end to the value of the UI VARIABLE at the time we call the function.
 */

const winsElement = () => (document.getElementById('wins').innerHTML = wins);
const lossesElement = () => (document.getElementById('losses').innerHTML = losses);
const guessesLeftElement = () => (document.getElementById('guesses-left').innerHTML = guessesLeft);
const userGuessesElement = () => (document.getElementById('user-guesses').innerHTML = userGuesses);

// Utility Functions
const computerChoice = () => {
  // recreate letters[indx]
  randomLetter = letters[Math.floor(Math.random() * letters.length)]; // translates to letters[22] for example
};

// initialize game function
const initializeGame = () => {
  /**
   * 2 Scenarios
   * - NO MATTER WHAT ALWAYS PICK A RANDOM LETTER
   *
   *
   * A- on the first load
   *  - show the wins, losses, guesses left as the initial data
   *  - show the user guesses array with no letters
   *
   *
   * B- after a win/loss game condition is met ( after a game has finished )
   *  - show the wins, losses --->(increment of + 1 to a loss/win based on game end HAPPENS IN EVENT LISTENER)
   *  - clear out the old guesses & show the user guesses array with no letters
   *  - show the guesses left for a new game (same as the initial load)
   */

  //  Scenario A

  // check if the user has already played the game and is resetting
  if (userGuesses.length > 0 && guessesLeft !== 10) {
    userGuesses = []; // when we reset/re-initialize the game update the previous game's guesses back to nothing
    guessesLeft = 10;
  }

  winsElement(); // no matter what the value is for win/losses it will always update the right amount
  lossesElement();
  guessesLeftElement();
  userGuessesElement();
  computerChoice();
};

// Event Listeners

// listen for the user to type a key in the keyboard
// check that against the random letter chosen by PC
// if right ---> win, then increment wins and show winning message
// if wrong,--> then decrement # of guess
// check that # of guesses not 0 and show the letter guessed
// if no guesses left, then --->  losses + 1 to a loss based on game end
//   a.) ['a','b','c'..... 10th elm] <-- at the time of the loss condition

// initialize the application
initializeGame();
