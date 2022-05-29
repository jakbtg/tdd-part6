import { expect } from "chai";
import { parseRLE } from "../src/parseRLE.mjs";

describe("parse RLE", () => {
  it("should return an array", () => {
    let result = parseRLE("");
    expect(result).to.be.an("array");
  });

});