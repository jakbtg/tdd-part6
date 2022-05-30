import { GameOfLife } from "./GameOfLife.mjs";

function play() {
    let game = new GameOfLife(process.argv[2], process.argv[3]);
    console.log("Game of Life with " + game.pattern.name + " and " + game.numIterations + " iterations");
    game.output();
    console.table(game.iterations());
}

play();