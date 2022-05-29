import { parseFile, parseRLE } from "./RLE.mjs";

export class GameOfLife {
    pattern;

    constructor(file) {
        this.pattern = parseFile(file);
    }

    getInitialGrid() {
        return parseRLE(this.pattern.rle, this.pattern.x);
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