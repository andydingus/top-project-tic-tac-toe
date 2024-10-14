// Ready to be scripted!
// Step 1
// Store the gameboard as an array inside of a Gameboard object

// Since we only need one instance of the gameboard, I turned it into an IIFE
const TicTacToe = (function () {
    let board = ["_", "_", "_", 
                   "_", "_", "_", 
                   "_", "_", "_"];
    let win = false;

    function createPlayer (name, symbol) {
        const saySymbol = () => console.log(`${name}\'s symbol is ${symbol}`);
        return {name, symbol, saySymbol};
    };

    function boardStatus() {
        console.log(board); 
    };

    function checkForWin(playerOneTurn, playerTwoTurn) {
        boardStatus();
        // Conditions for wins
        // Look to separate these based on Player Turn (X and O)
        // Horizontal wins
        if (playerOneTurn) {
            if (board[0] === 'X' && board[1] === 'X' && board[2] === 'X') {
                console.log("Player 1 wins");
                win = true;
            } else if (board[3] === 'X' && board[4] === 'X' && board[5] === 'X') {
                console.log("Player 1 wins");
                win = true;
            } else if (board[6] === 'X' && board[7] === 'X' && board[8] === 'X') {
                console.log("Player 1 wins");
                win = true;
    
            // Vertical wins
            } else if (board[0] === 'X' && board[3] === 'X' && board[6] === 'X') {
                console.log("Player 1 wins");
                win = true;
            } else if (board[1] === 'X' && board[4] === 'X' && board[7] === 'X') {
                console.log("Player 1 wins");
                win = true;
            } else if (board[2] === 'X' && board[5] === 'X' && board[8] === 'X') {
                console.log("Player 1 wins");
                win = true;
    
            // Diagonal wins
            } else if (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') {
                console.log("Player 1 wins");
                win = true;
            } else if (board[2] === 'X' && board[4] === 'X' && board[6] === 'X') {
                console.log("Player 1 wins");
                win = true;
            } else {
                console.log("Game is still ongoing");
            }
        } else if (playerTwoTurn) {
            if (board[0] === 'O' && board[1] === 'O' && board[2] === 'O') {
                console.log("Player 2 wins");
                win = true;
            } else if (board[3] === 'O' && board[4] === 'O' && board[5] === 'O') {
                console.log("Player 2 wins");
                win = true;
            } else if (board[6] === 'O' && board[7] === 'O' && board[8] === 'O') {
                console.log("Player 2 wins");
                win = true;
    
            // Vertical wins
            } else if (board[0] === 'O' && board[3] === 'O' && board[6] === 'O') {
                console.log("Player 2 wins");
                win = true;
            } else if (board[1] === 'O' && board[4] === 'O' && board[7] === 'O') {
                console.log("Player 2 wins");
                win = true;
            } else if (board[2] === 'O' && board[5] === 'O' && board[8] === 'O') {
                console.log("Player 2 wins");
                win = true;
    
            // Diagonal wins
            } else if (board[0] === 'O' && board[4] === 'O' && board[8] === 'O') {
                console.log("Player 2 wins");
                win = true;
            } else if (board[2] === 'O' && board[4] === 'O' && board[6] === 'O') {
                console.log("Player 2 wins");
                win = true;
            } else {
                console.log("Game is still ongoing");
            }
        }
        

        return win;
    }

    function startGame() {
        playerOne = createPlayer(prompt('Enter Player 1\'s name: '), 'X');
        playerTwo = createPlayer(prompt('Enter Player 2\'s name: '), 'O');
        let running = true;
        let playerOneTurn = true;
        let playerTwoTurn = false;

        while (running) {
            if (playerOneTurn && win == false) {
                console.log(`${playerOne.name}'s turn`)
                let choice = prompt('Which block? (1-9)');
                board[choice - 1] = 'X';
                playerOneTurn = false;
                playerTwoTurn = true;
                checkForWin(playerOneTurn, playerTwoTurn);
            } else {
                console.log(`${playerTwo.name}'s turn`)
                let choice = prompt('Which block? (1-9)');
                board[choice - 1] = 'O';
                playerOneTurn = true;
                playerTwoTurn = false;
                checkForWin(playerOneTurn, playerTwoTurn);
            }
        }
    }

    // return {boardStatus, createPlayer, boardStatus, checkForWin};
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