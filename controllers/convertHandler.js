function ConvertHandler() {
  const isNum = /(\d*\D*\d){1,}/;
  const isWhole = /^\d+$/;
  const isDecimal = /(^\d*\.\d+$)|(^\d+\.\d*$)/;
  const isFraction = /^\d+\/\d+$/;
  const startsWithDot = /^\./;
  const endsWithDot = /\.%/;
  const isUnit = /[a-z]+$/;

  this.getNum = function (input) {
    if (input === "") return 1;
    if (isNum.test(input)) {
      let initNum = input.match(isNum)[0];
      if (isWhole.test(initNum)) {
        return Number(initNum);
      }
      if (isDecimal.test(initNum)) {
        if (startsWithDot.test(initNum)) return Number("0" + initNum);
        if (endsWithDot.test(initNum))
          return Number(initNum.slice(0, initNum.length()));
        return Number(initNum);
      }
      if (isFraction.test(initNum)) {
        return eval(initNum);
      }
      return "invalid number";
    }
  };

  this.getUnit = function (input) {
    if (isUnit.test(input)) {
      initUnit = input.match(isUnit)[0];
      if (
        initUnit === "mi" ||
        initUnit === "gal" ||
        initUnit === "lbs" ||
        initUnit === "km" ||
        initUnit === "L" ||
        initUnit === "kg"
      ) {
        return initUnit;
      }
    }
    return "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    if (/gal/i.test(initUnit)) return "L";
    if (/lbs/i.test(initUnit)) return "kg";
    if (/mi/i.test(initUnit)) return "km";
    if (/L/i.test(initUnit)) return "gal";
    if (/kg/i.test(initUnit)) return "lbs";
    if (/km/i.test(initUnit)) return "mi";
  };

  this.spellOutUnit = function (unit) {
    if (/gal/i.test(unit)) return "gallons";
    if (/lbs/i.test(unit)) return "pounds";
    if (/mi/i.test(unit)) return "miles";
    if (/L/i.test(unit)) return "liters";
    if (/kg/i.test(unit)) return "kilograms";
    if (/km/i.test(unit)) return "kilometers";
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    if (/gal/i.test(initUnit)) return initNum * galToL;
    if (/lbs/i.test(initUnit)) return initNum * lbsToKg;
    if (/mi/i.test(initUnit)) return initNum * miToKm;

    if (/L/i.test(initUnit)) return initNum / galToL;
    if (/kg/i.test(initUnit)) return initNum / lbsToKg;
    if (/km/i.test(initUnit)) return initNum / miToKm;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
