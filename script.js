// Ready to be scripted!
// Step 1
// Store the gameboard as an array inside of a Gameboard object

function Gameboard() {
    const board = [];

    function createPlayer (name, symbol) {
        const saySymbol = () => console.log(`${name}\'s symbol is ${symbol}`);
        return {name, saySymbol};
    };

    return {board, createPlayer};
}

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

const tictactoe = Gameboard();
const andy = tictactoe.createPlayer('Andy', 'X');
const brian = tictactoe.createPlayer('Brian', 'O');

console.log(tictactoe);
console.log(andy.name);
andy.saySymbol();

console.log(brian.name);
brian.saySymbol();