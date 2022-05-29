import { expect } from "chai";
import { GameOfLife } from "../src/GameOfLife.mjs";

describe("Game of Life tests", () => {
    it("can create a grid from a given pattern", () => {
        let matrix = [[1, 1], [1, 1]];
        let grid = new GameOfLife("patterns/block.rle");
        expect(grid.getInitialGrid()).to.deep.equal(matrix);
    });
});