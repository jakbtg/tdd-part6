import { parseFile, parseRLE } from "./RLE.mjs";

export class GameOfLife {
    pattern;

    constructor(file) {
        this.pattern = parseFile(file);
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
        console.log(this.pattern.x, this.pattern.y);
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

    getNeighbors(grid, x, y) {
        let neighbors = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let xNeighbor = (x + j + this.pattern.x) % this.pattern.x;
                let yNeighbor = (y + i + this.pattern.y) % this.pattern.y;
                if (grid[yNeighbor][xNeighbor] === 1) {
                    neighbors += 1;
                }
            }
        }
        neighbors -= grid[y][x];
        return neighbors;
    }

}