import { expect } from "chai";
import sinon from "sinon";
import { GameOfLife } from "../src/GameOfLife.mjs";

describe("Game of Life tests", () => {
    it("can create a grid from a given pattern", () => {
        let matrix = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
        let grid = new GameOfLife("patterns/block.rle", 0);
        expect(grid.getInitialGrid()).to.deep.equal(matrix);
    });

    it("can get the correct max size", () => {
        let grid = new GameOfLife("patterns/blinker.rle", 0);
        expect(grid.getMax()).to.equal(3);
    });

    it("grid should be two cell bigger than the max of x or y of the pattern", () => {
        let grid = new GameOfLife("patterns/blinker.rle", 0);
        expect(grid.getInitialGrid().length).to.equal(5);
    });

    it("iterations calls getNextGeneration once", () => {
        let game = new GameOfLife("patterns/blinker.rle", 1);
        let spy = sinon.spy(game, "getNextGeneration");
        game.iterations();
        expect(spy.callCount).to.equal(1);
    });

    it("iterations calls getNextGeneration twice", () => {
        let game = new GameOfLife("patterns/blinker.rle", 2);
        let spy = sinon.spy(game, "getNextGeneration");
        game.iterations();
        expect(spy.callCount).to.equal(2);
    });

    it("iterations calls getNextGeneration more than twice", () => {
        let game = new GameOfLife("patterns/blinker.rle", 5);
        let spy = sinon.spy(game, "getNextGeneration");
        game.iterations();
        expect(spy.callCount).to.equal(5);
    });

    it("iterations calls getNextGeneration 0 times", () => {
        let game = new GameOfLife("patterns/blinker.rle", 0);
        let spy = sinon.spy(game, "getNextGeneration");
        game.iterations();
        expect(spy.callCount).to.equal(0);
    });
});


describe("Game of Life finding neighbors", () => {
    it("should return the correct number of neighbors with 3 neighbors", () => {
        let game = new GameOfLife("patterns/block.rle", 0);
        let grid = game.getInitialGrid();
        let neighbors = game.getNeighbors(grid, 1, 1);
        expect(neighbors).to.equal(3);
    });

    it("should return the correct number of neighbors with 2 neighbors", () => {
        let game = new GameOfLife("patterns/block.rle", 0);
        let grid = game.getInitialGrid();
        let neighbors = game.getNeighbors(grid, 0, 1);
        expect(neighbors).to.equal(2);
    });

    it("should return the correct number of neighbors with 1 neighbor", () => {
        let game = new GameOfLife("patterns/block.rle", 0);
        let grid = game.getInitialGrid();
        let neighbors = game.getNeighbors(grid, 0, 0);
        expect(neighbors).to.equal(1);
    });

    it("should return the correct number of neighbors with 0 neighbors", () => {
        let game = new GameOfLife("patterns/glider.rle", 0);
        let grid = game.getInitialGrid();
        let neighbors = game.getNeighbors(grid, 0, 0);
        expect(neighbors).to.equal(0);
    });

    it("should return the correct number of neighbors with more than 3 neighbors", () => {
        let game = new GameOfLife("patterns/glider.rle", 0);
        let grid = game.getInitialGrid();
        let neighbors = game.getNeighbors(grid, 2, 2);
        expect(neighbors).to.equal(5);
    });

    it("should return correct number of neighbors even if on the edge", () => {
        let game = new GameOfLife("patterns/glider.rle", 0);
        // testing with a fake grid
        let grid = [[0, 1, 1], [0, 0, 0], [1, 0, 0]];
        let neighbors = game.getNeighbors(grid, 0, 0);
        expect(neighbors).to.equal(3);
    });
});


describe("Game of Life determining the next generation", () => {
    // Here I'll set the num of iterations to 0, because I'm not testing the number of iterations, but the next generation
    
    it("should return a grid", () => {
        let game = new GameOfLife("patterns/glider.rle", 0);
        let grid = game.getInitialGrid();
        let nextGen = game.getNextGeneration(grid);
        expect(nextGen).to.be.an("array");
    });

    it("should return a grid with the correct size", () => {
        let game = new GameOfLife("patterns/glider.rle", 0);
        let grid = game.getInitialGrid();
        let nextGen = game.getNextGeneration(grid);
        expect(nextGen.length).to.equal(grid.length);
    });

    it("should return the correct next generation, with no changes", () => {
        let game = new GameOfLife("patterns/block.rle", 0);
        let grid = game.getInitialGrid();
        let nextGen = game.getNextGeneration(grid);
        expect(nextGen).to.deep.equal([[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]);
    });

    it("should return the correct next generation, with changes", () => {
        let game = new GameOfLife("patterns/blinker.rle", 0);
        let grid = game.getInitialGrid();
        let nextGen = game.getNextGeneration(grid);
        expect(nextGen).to.deep.equal([[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
    });

    it("correct next generation even if applied twice", () => {
        let game = new GameOfLife("patterns/blinker.rle", 0);
        let grid = game.getInitialGrid();
        let nextGen = game.getNextGeneration(grid);
        nextGen = game.getNextGeneration(nextGen);
        expect(nextGen).to.deep.equal([[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
    });

    it("should return the correct next generation even crossing the edges", () => {
        let game = new GameOfLife("patterns/glider.rle", 0);
        let grid = game.getInitialGrid();
        let nextGen = game.getNextGeneration(grid);
        nextGen = game.getNextGeneration(nextGen);
        nextGen = game.getNextGeneration(nextGen);
        nextGen = game.getNextGeneration(nextGen);
        nextGen = game.getNextGeneration(nextGen);
        expect(nextGen).to.deep.equal([[0, 0, 0, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 1], [0, 0, 0, 1, 1]]);
    });
});


describe("Game of Life output tests", () => {
    // TODO: test the output of the game

});