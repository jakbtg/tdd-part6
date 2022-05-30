import { GameOfLife } from "./GameOfLife.mjs";

function play() {
    let game = new GameOfLife(process.argv[2], process.argv[3]);
    console.log("with " + game.pattern.name + " and " + game.numIterations + " iterations");
    game.output();
}

console.log("Start game of life\n", play(), "\nEnd game of life");
