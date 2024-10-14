// Ready to be scripted!
// Step 1
// Store the gameboard as an array inside of a Gameboard object

// Since we only need one instance of the gameboard, I turned it into an IIFE
const TicTacToe = (function () {
    let board = Array(9).fill(""); // Initialize board
    let win = false;

    const createPlayer = (name, symbol) => ({
        name,
        symbol,
        saySymbol: () => console.log(`${name}'s symbol is ${symbol}`)
    });

    const boardStatus = () => {
        console.log(board);
    };

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
                return true;
            }
        }
        return false; // Game is still ongoing
    };

    const startGame = () => {
        const playerOne = createPlayer(prompt('Enter Player 1\'s name: '), 'X');
        const playerTwo = createPlayer(prompt('Enter Player 2\'s name: '), 'O');
        let currentPlayer = playerOne;

        while (!win) {
            boardStatus(); // Display board status before each turn
            console.log(`${currentPlayer.name}'s turn`);
            let choice = prompt('Which block? (1-9)') - 1; // Convert to zero-based index
            
            if (board[choice] === "") { // Check if block is empty
                board[choice] = currentPlayer.symbol;
                win = checkForWin(currentPlayer.symbol); // Check for a win
                if (!win) {
                    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne; // Switch players
                }
            } else {
                console.log("That block is already taken. Try again.");
            }
        }
    };

    return startGame();
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