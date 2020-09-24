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
 * @prop {UI functions} --- HELP US RENDER THE UPDATES
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

// my string input will look like "<button class="btn">A</button><button class="btn">B</button>...."
const lettersContainerElement = string => (document.getElementById('letter-buttons-container').innerHTML = string);

// Utility Functions
const computerChoice = () => {
  // recreate letters[indx]
  randomLetter = letters[Math.floor(Math.random() * letters.length)]; // translates to letters[22] for example
};

// DRYING UP OUR CODE
const displayMessage = message => alert(message);

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

const takeTurn = userChoice => {
  // then decrement # of guess
  guessesLeft -= 1;
  // (add it to the user guesses array)
  userGuesses.push(userChoice);
  // show the letters guessed & render the new guesses value
  userGuessesElement();
  guessesLeftElement();
};

const checkWinCondition = userChoice => {
  // check the userChoice against the randomLetter chosen by PC
  if (randomLetter === userChoice) {
    // if right ---> win, then increment wins and show winning message & reset the game
    wins += 1;
    displayMessage("Way to go!!!!, You're a freakin mind reader!!!");
    initializeGame();
  } else if (guessesLeft === 0) {
    // if no guesses left, then --->  losses + 1 to a loss based on game end AND reset the game
    //   a.) ['a','b','c'..... 10th elm] <-- at the time of the loss condition
    displayMessage('Oooops you ran out of Guesses!');
    losses += 1;
    initializeGame();
  }
};

const checkForValidTurn = userChoice => {
  if (!letters.includes(userChoice)) {
    // * exclude: numbers & special chars
    displayMessage('No special characters or number, please pick a letter from the alphabet');
  } else if (userGuesses.includes(userChoice)) {
    // * exclude: duplicate choices
    displayMessage('Sorry, but you cannot choose the same letter twice. ');
  } else {
    // ONLY COUNT VALID CHOICES AS A TURN
    takeTurn(userChoice);
  }
};

// Event Listeners

// listen for the user to type a key in the keyboard
document.addEventListener('keypress', function(event) {
  /**
   * @FLOW
   * when the user types a key on their keyboard
   * then we should reduce the # of guesses right away
   * then we check if the guess is correct
   * else if check if they can still guess
   * if win/lose, update the correct state value AND reset the game
   *
   */
  const userChoice = event.key.toLowerCase(); // always convert the data to a unifor type

  checkForValidTurn(userChoice);
  checkWinCondition(userChoice);
});

// initialize the application
initializeGame();
