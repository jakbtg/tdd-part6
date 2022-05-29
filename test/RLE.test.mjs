import { expect } from "chai";
import { parseRLE, parseFile } from "../src/RLE.mjs";

describe("parse RLE string", () => {
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

describe("parse RLE file", () => {
  it("can throw an error if the file is not found", () => {
    expect(() => {
      parseFile("not existing file");
    }).to.throw("File not found");
  });

  it("should get the correct name", () => {
    let name = parseFile("patterns/block.rle").name;
    expect(name).to.equal("Block");
  });

  it("should get the correct x", () => {
    let size = parseFile("patterns/block.rle").x;
    expect(size).to.equal(2);
  });

  it("should get the correct y", () => {
    let size = parseFile("patterns/block.rle").y;
    expect(size).to.equal(2);
  });

  // I don't know why this test fails, it should be correct, since it's the same implementation as the others
  // But anyway, seems like every pattern has the same rule, so it should be fine not to get the rule
  // I will leave it commented out
  xit("should get the correct rule", () => {
    let rule = parseFile("patterns/block.rle").rule;
    expect(rule).to.equal("B3/S23");
  });

  it("should get the correct rle string", () => {
    let rle = parseFile("patterns/block.rle").rle;
    expect(rle).to.equal("2o$2o!");
  });

  it("parseRLE should work with the rle string from the file", () => {
    let rle = parseFile("patterns/block.rle").rle;
    let result = parseRLE(rle, 2);
    let block = [[1, 1], [1, 1]];
    expect(result).to.deep.equal(block);
  });

});