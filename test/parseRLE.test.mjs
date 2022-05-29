import { expect } from "chai";
import { parseRLE } from "../src/parseRLE.mjs";

describe("parse RLE", () => {
  it("should return an array", () => {
    let result = parseRLE("");
    expect(result).to.be.an("array");
  });

  it("should return the correct matrix", () => {
    let result = parseRLE("2o$2o!");
    let block = [[1, 1], [1, 1]];
    expect(result).to.deep.equal(block);
  });

});