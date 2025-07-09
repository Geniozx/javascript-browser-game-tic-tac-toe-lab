//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.
//

/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');
//console.log('Reset button:', resetBtnEl);  // To verify caching

//console.log('Square Elements:', squareEls); // Check if cached elements are correct
//console.log('Message Elements:', messageEl); // Check if message element is correct
/*-------------------------------- Functions --------------------------------*/
// Step 3: Initialize the game state

function init() {
  console.log('init() called'); // Confirmation that the function runs
  board = ['', '', '', '', '', '', '', '', '']; // a, c: Set the board to an array of 9 empty strings
  turn = 'X'; // d: Set the turn to 'X'
  winner = false; // e: Set winner to false (no one has won yet)
  tie = false; // f: Set tie to false (game is not a tie yet)
render(); // g: Call render to update the UI (we'll define render() next in Step 4)
}

init(); // b: Call init when the app loads
  
// Step 4a: Create the render function
function render() {
  updateBoard();    // Step 4f
  updateMessage();  // Step 4f
}

function updateBoard() { // Step 4b: Create the updateBoard function
  board.forEach((cell, idx) => {
    squareEls[idx].textContent = cell; // Step 4c: update square text
  });
}

function updateMessage() { // Step 4d: Create the updateMessage function
  if (!winner && !tie) {
    messageEl.textContent = `Player ${turn}'s Turn`;
  } else if (!winner && tie) {
    messageEl.textContent = "It's a Tie!";
  } else {
    messageEl.textContent = `Player ${turn} Wins!`;
  }
}

function handleClick(event) { // Step 6a: Create the handleClick function
  const squareIndex = parseInt(event.target.id); // Step 6c
  console.log('Square clicked:', squareIndex);   // Optional debug log

  // Step 6d: Ignore clicks if the square is already filled or game is over
  if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner) return;
  placePiece(squareIndex); // Step 6.1c  // - Place the move
  checkForWinner(); // - Check for winner
  checkForTie(); // - Check for tie
  switchPlayerTurn(); // - Switch turn
  render(); // - Re-render
}


function placePiece(index) { // Step 6.1a: Create placePiece function
  board[index] = turn; // Step 6.1b: Set board at index to current player
  //console.log('Updated board:', board); // For testing/debugging
}

// Step 6.2a: Create checkForWinner function
function checkForWinner() {
  // Define the 8 winning combinations (top row, middle row, etc.)
  const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // main diagonal
    [2, 4, 6]  // anti-diagonal
  ];

  // Step 6.2b: Loop through each combo and check for a winner
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      winner = true;
      c//onsole.log('Winner detected:', winner); // For testing
      return;
    }
  }
  winner = false; // No winner found
}

// Step 6.3a: Create checkForTie function
function checkForTie() {
  if (winner) return; // Step 6.3b: If there is a winner, it's not a tie
  if (board.includes('')) { // Step 6.3c: Check if there are any empty squares left
    tie = false;
  } else {
    tie = true;
  }
  //console.log('Tie status:', tie); // For testing
}

// Step 6.4a: Create switchPlayerTurn function
function switchPlayerTurn() {
  if (winner) return; // Step 6.4b: Don't switch if there's already a winner
  turn = turn === 'X' ? 'O' : 'X'; // Step 6.4c: Toggle turn between 'X' and 'O'
  //console.log('Turn switched to:', turn); // For testing
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => {// Add event listeners to each square
  square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);
