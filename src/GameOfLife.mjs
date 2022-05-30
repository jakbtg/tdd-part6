import { encodeRLE, parseFile, parseRLE, writeRLEFile } from "./RLE.mjs";

export class GameOfLife {
    pattern;
    numIterations;

    constructor(file, numIterations) {
        if (process.argv[2] != undefined && process.argv[3] != undefined) {
            this.pattern = parseFile(process.argv[2]);
            this.numIterations = parseInt(process.argv[3]);
        } else {
            this.pattern = parseFile(file);
            this.numIterations = numIterations;
        }
    }

    getInitialGrid() {
        let grid = this.createEmptyGrid();
        let rle = parseRLE(this.pattern.rle, this.pattern.x);
        for (let row = 0; row < this.pattern.y; row++) {
            for (let col = 0; col < this.pattern.x; col++) {
                grid[row + 1][col + 1] = rle[row][col];
            }
        }
        return grid;
    }

    createEmptyGrid() {
        let grid = [];
        let dim = this.getMax() + 2;
        for (let row = 0; row < dim; row++) {
            grid[row] = [];
            for (let col = 0; col < dim; col++) {
                grid[row][col] = 0;
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
                if (this.isAlive(grid, row, col)) {
                    this.applyAliveCellRules(row, col, nextGen, neighbors);
                } else {
                    this.applyDeadCellRules(row, col, nextGen, neighbors);
                }
            }
        }
        return nextGen;
    }

    applyAliveCellRules(row, col, nextGen, neighbors) {
        if (neighbors < 2 || neighbors > 3) {
            nextGen[row][col] = 0;
        } else {
            nextGen[row][col] = 1;
        }
    }

    applyDeadCellRules(row, col, nextGen, neighbors) {
        if (neighbors === 3) {
            nextGen[row][col] = 1;
        } else {
            nextGen[row][col] = 0;
        }
    }

    isAlive(grid, row, col) {
        return grid[row][col] === 1;
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
        writeRLEFile(this.pattern.name, comment, rle);
    }
}