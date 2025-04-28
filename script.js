// Ready to be scripted!

// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that shows the results upon game end!
// Add function to startButton. Remove lines 90 and 91 with input on page under Enter Player 1/2's name
const divGameBoard = document.getElementById('board');
const gameInfo = document.getElementById('gameInfo');
const btnStartReset = document.getElementById('btnStartReset');
const gameInfoChildren = gameInfo.children;
const gameBoardChildren = divGameBoard.children;
const statusText = document.getElementById('statusText');

const TicTacToe = (function () {
    let board = Array(9).fill(""); // Initialize board
    let win = false;
    let playerOne, playerTwo;
    let currentPlayer;

    // const createPlayer = (name, symbol) => ({
    //     name,
    //     symbol,
    //     saySymbol: () => console.log(`${name}'s symbol is ${symbol}`)
    // });
    function CreatePlayer(name, symbol){
        this.name = name;
        this.symbol = symbol;
        this.saySymbol = () => {
            console.log(`${name}'s symbol is ${symbol}`)
        };
    }

    const boardStatus = () => {
        console.log(board);
    };

    // Need to test for wins eventually
    const checkForWin = (currentPlayer) => {
        boardStatus();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6],            // Diagonal
        ];
        
        for (const pattern of winPatterns) {
            if (pattern.every(index => board[index] === currentPlayer)) {
                console.log(`Player ${currentPlayer === 'X' ? 1 : 2} wins`);
                btnStartReset.disabled = false;
                btnStartReset.textContent = 'Reset';
                return true;
            }
        }
        return false; // Game is still ongoing
    };

    const displayBoard = () => {
        for (let i = 0; i < board.length; i++){
            const cell = gameBoardChildren[i];
            const previous = cell.textContent;
            cell.textContent = board[i];

            // Only animate if symbol was just placed
            if (board[i] !== "" && previous !== board[i]) {
                cell.classList.add("symbol-placed");

                // Remove class after animation so it can be reapplied
                setTimeout(() => {
                    cell.classList.remove("symbol-placed");
                }, 300); // Match your animation duration
            }
        }
    };

    const handleMove = (index) => {
        if (!win && board[index] === "") { // Check if game is still ongoing and spot is empty
            board[index] = currentPlayer.symbol;
            displayBoard();
            if (checkForWin(currentPlayer.symbol)) {
                setTimeout(() => {
                    // alert(`${currentPlayer.name} wins!`);
                }, 100); // Small delay to let the UI update
                win = true;
                statusText.innerHTML = `${currentPlayer.name} wins!<br>Game has ended. Enter names (optional) and reset the game!`;
            } else if (board.every(cell => cell !== '')) {
                setTimeout(() => {
                    alert('It\'s a tie!');
                }, 100); // Small delay to let the UI update
            } else {
                currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne; // Switch players
                statusText.textContent = `${currentPlayer.name}'s turn`;
            }
        }
    };

    const startGame = () => {
        btnStartReset.disabled = true;

        const nameOne = document.getElementById('playerOneName').value || 'Player 1';
        const nameTwo = document.getElementById('playerTwoName').value || 'Player 2';

        playerOne = new CreatePlayer(nameOne, 'X');
        playerTwo = new CreatePlayer(nameTwo, 'O');
        currentPlayer = playerOne;
        statusText.textContent = `${currentPlayer.name}'s turn`;

        board = Array(9).fill("");
        win = false;
        displayBoard();
        btnStartReset.textContent = 'Reset';

        for (let i = 0; i < gameBoardChildren.length; i++){
            gameBoardChildren[i].textContent = '';
            gameBoardChildren[i].addEventListener('click', () => handleMove(i));
        }

        displayBoard(); // Display empty board

        // Resets names
        document.getElementById('playerOneName').value = '';
        document.getElementById('playerTwoName').value = '';
    };

    btnStartReset.addEventListener('click', () => {
        TicTacToe.startGame();
    });

    return {startGame};
})();


// Regular object way
// function Player(name) {
//     this.name = name;
// }

// const dingus = new Player('Andy');

// Factory function way
// function createPlayer (name, symbol) {
//     const saySymbol = () => console.log(`${name}\'s symbol is ${symbol}`);
//     return {name, saySymbol};
// };

// const andy = TicTacToe.createPlayer('Andy', 'X');
// const brian = TicTacToe.createPlayer('Brian', 'O');

// console.log(TicTacToe);
// console.log(andy.name);
// andy.saySymbol();

// console.log(brian.name);
// brian.saySymbol();