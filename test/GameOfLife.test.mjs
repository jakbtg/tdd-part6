import { expect } from "chai";
import { GameOfLife } from "../src/GameOfLife.mjs";

describe("Game of Life tests", () => {
    it("can create a grid from a given pattern", () => {
        let matrix = [[0, 1, 0], [0, 0, 1], [1, 1, 1]];
        let grid = new GameOfLife("patterns/glider.rle");
        expect(grid.getInitialGrid()).to.deep.equal(matrix);
    });

    it("grid should be one cell bigger than the max of x or y of the pattern", () => {
        let grid = new GameOfLife("patterns/block.rle");
        expect(grid.getInitialGrid().length).to.equal(3);
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

    // First i probably need to make the matrix bigger and squared to test the edge cases
    xit("should return the correct number of neighbors with another pattern", () => {
        let game = new GameOfLife("patterns/block.rle");
        let grid = game.getInitialGrid();
        let neighbors = game.getNeighbors(grid, 0, 0);
        expect(neighbors).to.equal(8);
    });
});