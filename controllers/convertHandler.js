function ConvertHandler() {
  const isNum = /\W*\d\W*/g;
  // const isNumTest =
  const isWhole = /^\d+$/;
  const isDecimal = /(^\d*\.\d+$)|(^\d+\.\d*$)/;
  // const isFraction = /^\d+\/\d+$/;
  const isFraction = /\//;
  // const isDecimalFraction =
  //   /(^(\d*\.\d+)|(^\d+\.\d*))\/((\d*\.\d+)|(\d+\.\d*))$/;
  const startsWithDot = /^\./;
  const endsWithDot = /\.%/;
  const isUnit = /[a-z]+$/i;

  this.getNum = function (input) {
    if (isNum.test(input)) {
      let initNum = input.match(isNum).join("");
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
        const separatorIndex = initNum.match(isFraction).index;
        let firstNum = initNum.slice(0, separatorIndex);
        let secondNum = initNum.slice(separatorIndex + 1);

        // Testing for firstNum
        if (isWhole.test(firstNum)) {
          firstNum = Number(firstNum);
        } else if (isDecimal.test(firstNum)) {
          if (startsWithDot.test(firstNum)) return Number("0" + firstNum);
          if (endsWithDot.test(firstNum))
            firstNum = Number(firstNum.slice(0, firstNum.length()));
          firstNum = Number(firstNum);
        } else {
          firstNum = "invalid number";
        }

        // Testing for secondNum
        if (isWhole.test(secondNum)) {
          secondNum = Number(secondNum);
        } else if (isDecimal.test(secondNum)) {
          if (startsWithDot.test(secondNum)) return Number("0" + secondNum);
          if (endsWithDot.test(secondNum))
            secondNum = Number(secondNum.slice(0, secondNum.length()));
          secondNum = Number(secondNum);
        } else {
          secondNum = "invalid number";
        }
        // return eval(initNum);
        if (firstNum === "invalid number" || secondNum === "invalid number") {
          return "invalid number";
        } else {
          let evalString = `${firstNum}/${secondNum}`;
          return eval(evalString);
        }
      } else {
        return "invalid number";
      }
    }
    return 1;
  };

  this.getUnit = function (input) {
    if (isUnit.test(input)) {
      initUnit = input.match(isUnit)[0];
      if (/^gal$/i.test(initUnit)) return "gal";
      if (/^lbs$/i.test(initUnit)) return "lbs";
      if (/^mi$/i.test(initUnit)) return "mi";
      if (/^L$/i.test(initUnit)) return "L";
      if (/^kg$/i.test(initUnit)) return "kg";
      if (/^km$/i.test(initUnit)) return "km";
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

    if (/gal/i.test(initUnit)) return (initNum * galToL).toFixed(5);
    if (/lbs/i.test(initUnit)) return (initNum * lbsToKg).toFixed(5);
    if (/mi/i.test(initUnit)) return (initNum * miToKm).toFixed(5);

    if (/L/i.test(initUnit)) return (initNum / galToL).toFixed(5);
    if (/kg/i.test(initUnit)) return (initNum / lbsToKg).toFixed(5);
    if (/km/i.test(initUnit)) return (initNum / miToKm).toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
