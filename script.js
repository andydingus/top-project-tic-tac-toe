// Ready to be scripted!

// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that shows the results upon game end!
// Add function to startButton. Remove lines 90 and 91 with input on page under Enter Player 1/2's name
const divGameBoard = document.getElementById('board');
const gameInfo = document.getElementById('gameInfo');
const btnStartReset = document.getElementById('btnStartReset');
const gameInfoChildren = gameInfo.children;
const gameBoardChildren = divGameBoard.children;
const statusText = document.getElementById('statusText');
const resultsText = document.getElementById('resultsText');
const resultsDiv = document.getElementById('results');

const TicTacToe = (function () {
    let board = Array(9).fill(""); // Initialize board
    let win = false;
    let playerOne, playerTwo;
    let playerOneWins = 0;
    let playerTwoWins = 0;
    let playerOneLosses = 0;
    let playerTwoLosses = 0;
    let playerOneTies = 0;
    let playerTwoTies = 0;
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

    const updateScoreDisplay = () => {
        if (!playerOne || !playerTwo) {
             console.warn("updateScoreDisplay: Player objects not yet initialized.");
             return;
        }
        const scoreTitleHTML = '<span class="score-title">Score</span><br>';
        resultsText.innerHTML = `${scoreTitleHTML}
            ${playerOne.name}: Wins ${playerOneWins}, Losses ${playerOneLosses}, Ties ${playerOneTies}<br>
            ${playerTwo.name}: Wins ${playerTwoWins}, Losses ${playerTwoLosses}, Ties ${playerTwoTies}`;
        
        // // Trigger animation
        // const animationDuration = 700; // *** MUST match CSS animation-duration in milliseconds ***

        // resultsText.classList.add('score-updated');

        // setTimeout(() => {
        //     resultsText.classList.remove('score-updated');
        // }, animationDuration);
    };

    const handleMove = (index) => {
        if (!win && board[index] === "") { // Check if game is still ongoing and spot is empty
            board[index] = currentPlayer.symbol;
            displayBoard();
            if (checkForWin(currentPlayer.symbol)) {
                setTimeout(() => {}, 100); // Small delay to let the UI update
                win = true;
                statusText.innerHTML = `${currentPlayer.name} wins!`;
                if (currentPlayer === playerOne) {
                    playerOneWins+= 1;
                    playerTwoLosses++;
                    console.log(playerOneWins);
                } else {
                    playerTwoWins++;
                    playerOneLosses++;
                }
                updateScoreDisplay();
                resultsDiv.classList.remove('hidden-fade');
                showGameInfoWithAnimation();
                playAgain.classList.remove('hidden');
                playAgain.classList.add('visible');
            } else if (board.every(cell => cell !== '')) {
                setTimeout(() => {}, 100);
                statusText.innerHTML = 'It\'s a tie!'; // Small delay to let the UI update
                playerOneTies++, playerTwoTies++;
                updateScoreDisplay();
                resultsDiv.classList.remove('hidden-fade');
                btnStartReset.disabled = false;
                btnStartReset.textContent = 'Reset';
                playAgain.classList.remove('hidden');
                playAgain.classList.add('visible');
            } else {
                currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne; // Switch players
                statusText.textContent = `${currentPlayer.name}'s turn`;
            }
        }
    };

    const showGameInfoWithAnimation = () => {
        const elementsToBeVisible = [gameInfo, playAgain];
        elementsToBeVisible.forEach(element => {
            if (element) {
                element.classList.remove('hidden');
                element.classList.add('visible');
            } else {
                console.warn("showGameInfoWithAnimation: An element expected for animation is missing.")
            }
        });
    }    

    const startGame = () => {
        btnStartReset.disabled = true;

        const nameOne = document.getElementById('playerOneName').value || 'Player 1';
        const nameTwo = document.getElementById('playerTwoName').value || 'Player 2';

        playerOne = new CreatePlayer(nameOne, 'X');
        playerTwo = new CreatePlayer(nameTwo, 'O');
        currentPlayer = playerOne;
        statusText.textContent = `${currentPlayer.name}'s turn`;

        resultsDiv.classList.add('hidden-fade');

        // Trigger CSS animation for Player names and PLay again
        gameInfo.classList.remove('visible');
        gameInfo.classList.add('hidden');
        playAgain.classList.remove('visible');
        playAgain.classList.add('hidden');

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