const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input", function () {
    const result = convertHandler.getNum("1");
    assert.equal(result, "1");
  });
  test("convertHandler should correctly read a decimal number input", function () {
    const result = convertHandler.getNum("1.0");
    assert.equal(result, "1.0");
  });
  test("convertHandler should correctly read a fractional input", function () {
    const result = convertHandler.getNum("1/2");
    assert.equal(result, "0.5");
  });
  test("convertHandler should correctly read a fractional input with a decimal", function () {
    const result = convertHandler.getNum("2.5/5");
    assert.equal(result, "0.5");
  });
  test("convertHandler should correctly return an error on a double-fraction", function () {
    const result = convertHandler.getNum("3/2/3");
    assert.equal(result, "invalid number");
  });
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
    const result = convertHandler.getNum("");
    assert.equal(result, "1");
  });
  test("convertHandler should correctly read each valid input unit", function () {
    const validUnitsArray = ["gal", "L", "mi", "km", "lbs", "kg"];
    assert.notEqual(convertHandler.getUnit("mi"), "invalid unit");
    assert.notEqual(convertHandler.getUnit("km"), "invalid unit");
    assert.notEqual(convertHandler.getUnit("gal"), "invalid unit");
    assert.notEqual(convertHandler.getUnit("L"), "invalid unit");
    assert.notEqual(convertHandler.getUnit("lbs"), "invalid unit");
    assert.notEqual(convertHandler.getUnit("kg"), "invalid unit");
  });
  test("convertHandler should correctly return an error for an invalid input unit", function () {
    const result = convertHandler.getUnit("1.2notavalidunit");
    assert.equal(result, "invalid unit");
  });
  test("convertHandler should return the correct return unit for each valid input unit", function () {
    const validUnitsArray = ["gal", "L", "mi", "km", "lbs", "kg"];
    assert.notEqual(convertHandler.getUnit("mi"), "km");
    assert.notEqual(convertHandler.getUnit("km"), "mi");
    assert.notEqual(convertHandler.getUnit("gal"), "L");
    assert.notEqual(convertHandler.getUnit("L"), "gal");
    assert.notEqual(convertHandler.getUnit("lbs"), "kg");
    assert.notEqual(convertHandler.getUnit("kg"), "lbs");
  });
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function () {
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });
  test("convertHandler should correctly convert gal to L", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
  });
  test("convertHandler should correctly convert L to gal", function () {
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
  });
  test("convertHandler should correctly convert mi to km", function () {
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
  });
  test("convertHandler should correctly convert km to mi", function () {
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
  });
  test("convertHandler should correctly convert lbs to kg", function () {
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
  });
  test("convertHandler should correctly convert kg to lbs", function () {
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });
});
