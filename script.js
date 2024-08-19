// Ready to be scripted!
// Step 1
// Store the gameboard as an array inside of a Gameboard object

const Gameboard = () => {
    const board = [];
    return {board};
}

// Regular object way
// function Player(name) {
//     this.name = name;
// }

// const dingus = new Player('Andy');

// Factory function way
const Player = (name, symbol) => {
    const saySymbol = () => console.log(`${name}\'s symbol is ${symbol}`);
    return { name, saySymbol};
};

const tictactoe = Gameboard();
const andy = Player('Andy', 'X');
const brian = Player('Brian', 'O');

console.log(tictactoe);
console.log(andy.name);
andy.saySymbol();

console.log(brian.name);
brian.saySymbol();