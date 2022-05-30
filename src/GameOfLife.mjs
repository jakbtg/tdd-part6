import { encodeRLE, parseFile, parseRLE, writeRLEFile } from "./RLE.mjs";

export class GameOfLife {
    pattern;
    numIterations;
    numOutput;

    constructor(file, numIterations) {
        this.pattern = parseFile(file);
        this.numIterations = numIterations;
        this.numOutput = 1;
    }

    getInitialGrid() {
        let grid = [];
        let dim = this.getMax() + 2;
        for (let row = 0; row < dim; row++) {
            grid[row] = [];
            for (let col = 0; col < dim; col++) {
                grid[row][col] = 0;
            }
        }
        let rle = parseRLE(this.pattern.rle, this.pattern.x);
        for (let row = 0; row < this.pattern.y; row++) {
            for (let col = 0; col < this.pattern.x; col++) {
                grid[row + 1][col + 1] = rle[row][col];
            }
        }
        return grid;
    }

    getMax() {
        return Math.max(this.pattern.x, this.pattern.y);
    }

    getNeighbors(grid, row, col) {
        let neighbors = 0;
        let rows = grid.length;
        let cols = grid.length;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let colNeighbor = (col + j + cols) % cols;
                let rowNeighbor = (row + i + rows) % rows;
                if (grid[rowNeighbor][colNeighbor] === 1) {
                    neighbors += 1;
                }
            }
        }
        neighbors -= grid[row][col];
        return neighbors;
    }

    getNextGeneration(grid) {
        let nextGen = [];
        let rows = grid.length;
        let cols = grid.length;
        for (let row = 0; row < rows; row++) {
            nextGen[row] = [];
            for (let col = 0; col < cols; col++) {
                let neighbors = this.getNeighbors(grid, row, col);
                if (grid[row][col] === 1) {
                    if (neighbors < 2 || neighbors > 3) {
                        nextGen[row][col] = 0;
                    } else {
                        nextGen[row][col] = 1;
                    }
                } else {
                    if (neighbors === 3) {
                        nextGen[row][col] = 1;
                    } else {
                        nextGen[row][col] = 0;
                    }
                }
            }
        }
        return nextGen;
    }
    
    iterations() {
        let grid = this.getInitialGrid();
        for (let i = 0; i < this.numIterations; i++) {
            grid = this.getNextGeneration(grid);
        }
        return grid;
    }

    output() {
        let grid = this.iterations();
        let rle = encodeRLE(grid);
        let comment = "Playing the game of life with " + this.pattern.name + " and " + this.numIterations + " iterations";
        writeRLEFile(this.numOutput, comment, rle);
        this.numOutput += 1;
    }

}