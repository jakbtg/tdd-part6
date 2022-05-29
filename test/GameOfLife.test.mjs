import { expect } from "chai";
import { GameOfLife } from "../src/GameOfLife.mjs";

describe("Game of Life tests", () => {
    it("can create a grid from a given pattern", () => {
        let matrix = [[0, 1, 0], [0, 0, 1], [1, 1, 1]];
        let grid = new GameOfLife("patterns/glider.rle");
        expect(grid.getInitialGrid()).to.deep.equal(matrix);
    });
});

// begin work with Game of Life rules
describe("Game of Life rules", () => {
    it("should return the correct number of neighbors", () => {
        let game = new GameOfLife("patterns/glider.rle");
        let grid = game.getInitialGrid();
        let neighbors = game.getNeighbors(grid, 1, 1);
        expect(neighbors).to.equal(5);
    });
});