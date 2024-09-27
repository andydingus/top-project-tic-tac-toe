// Ready to be scripted!
// Step 1
// Store the gameboard as an array inside of a Gameboard object

// Since we only need one instance of the gameboard, I turned it into an IIFE
const TicTacToe = (function () {
    const board = ["_", "_", "X", 
                   "_", "X", "_", 
                   "X", "_", "_"];

    function createPlayer (name, symbol) {
        const saySymbol = () => console.log(`${name}\'s symbol is ${symbol}`);
        return {name, symbol, saySymbol};
    };

    function boardStatus() {
        console.log(board); 
    };

    function checkForWin() {
        boardStatus();
        // Conditions for wins
        // Look to separate these based on Player Turn (X and O)
        // Horizontal wins
        if (board[0] === 'X' && board[1] === 'X' && board[2] === 'X') {
            console.log("Player 1 wins");
        } else if (board[3] === 'X' && board[4] === 'X' && board[5] === 'X') {
            console.log("Player 1 wins");
        } else if (board[6] === 'X' && board[7] === 'X' && board[8] === 'X') {
            console.log("Player 1 wins");

        // Vertical wins
        } else if (board[0] === 'X' && board[3] === 'X' && board[6] === 'X') {
            console.log("Player 1 wins");
        } else if (board[1] === 'X' && board[4] === 'X' && board[7] === 'X') {
            console.log("Player 1 wins");
        } else if (board[2] === 'X' && board[5] === 'X' && board[8] === 'X') {
            console.log("Player 1 wins");

        // Diagonal wins
        } else if (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') {
            console.log("Player 1 wins");
        } else if (board[2] === 'X' && board[4] === 'X' && board[6] === 'X') {
            console.log("Player 1 wins");
        } else {
            console.log("Game is still ongoing");
        }
    }

    return {boardStatus, createPlayer, boardStatus, checkForWin};
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