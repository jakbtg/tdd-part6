import { parseFile, parseRLE } from "./RLE.mjs";

export class GameOfLife {
    pattern;

    constructor(file) {
        this.pattern = parseFile(file);
    }

    getInitialGrid() {
        return parseRLE(this.pattern.rle, this.pattern.x);
    }
}