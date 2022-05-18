const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("ConvertHandler should read whole numbers", function () {
    const result = convertHandler.getNum("1");
    assert.equal(result, "1");
  });
  test("ConverHandler.getNum should read decimal numbers", function () {
    const result = convertHandler.getNum("1.0");
    assert.equal(result, "1.0");
  });
  test("ConverHandler.getNum should read fractions", function () {
    const result = convertHandler.getNum("1/2");
    assert.equal(result, "0.5");
  });
});
