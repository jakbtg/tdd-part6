import { expect } from "chai";
import { parseRLE } from "../src/parseRLE.mjs";

describe("parse RLE", () => {
  it("should return an array", () => {
    let result = parseRLE("");
    expect(result).to.be.an("array");
  });

  it("should return the correct matrix", () => {
    let result = parseRLE("2o$2o!", 2);
    let block = [[1, 1], [1, 1]];
    expect(result).to.deep.equal(block);
  });

  it("should return the correct other more complex matrix", () => {
    let result = parseRLE("bo$2bo$3o!", 3);
    let block = [[0, 1, 0], [0, 0, 1], [1, 1, 1]];
    expect(result).to.deep.equal(block);
  });

});