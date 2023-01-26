let firstNumber = "";
let secondNumber = "";
let sign = "";
let signForPercentage = "";
let finish = false;

const arrayNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const arrayAction = ["-", "+", "X", "/", "%", "+/-"];
const arrayActionForPercentage = ["-", "+", "X", "/"];

const calcScreen = document.querySelector(".calc-screen p");

function clearAll() {
  firstNumber = "";
  secondNumber = "";
  sign = "";
  finish = false;
  calcScreen.textContent = 0;
}

// function plusMinus() {
//   if (secondNumber === "") {
//     firstNumber *= -1;
//     calcScreen.textContent = firstNumber;
//   } else {
//     secondNumber *= -1;
//     calcScreen.textContent = secondNumber;
//   }
// }
/*if (e.target.classList.contains("+/-")) {
    if (secondNumber === "") {
      firstNumber *= -1;
      calcScreen.textContent = secondNumber;
    } else {
      secondNumber *= -1;
    }
  } */
// document.querySelector(".plus-minus").onclick = plusMinus;

document.querySelector(".ac").onclick = clearAll;

document.querySelector(".buttons").onclick = (e) => {
  if (!e.target.classList.contains("btn")) return;
  if (e.target.classList.contains("ac")) return;
  if (e.target.classList.contains("+/-")) return;

  calcScreen.textContent = 0;
  const key = e.target.textContent;

  if (arrayNumbers.includes(key)) {
    if (secondNumber === "" && sign === "") {
      firstNumber += key;
      calcScreen.textContent = firstNumber;
    } else if (firstNumber !== "" && secondNumber !== "" && finish) {
      secondNumber = key;
      finish = false;
      calcScreen.textContent = secondNumber;
    } else {
      secondNumber += key;
      calcScreen.textContent = secondNumber;
    }
  }

  if (arrayAction.includes(key) && key !== "+/-") {
    sign = key;
    calcScreen.textContent = sign;
  }

  if (key === "+/-") {
    if (sign === "") {
      firstNumber *= -1;
      calcScreen.textContent = firstNumber;
    } else if (secondNumber !== "") {
      secondNumber *= -1;
      calcScreen.textContent = secondNumber;
    } else {
      secondNumber = "-";
      calcScreen.textContent = secondNumber;
    }
  }

  if (arrayActionForPercentage.includes(key) && key !== "%") {
    signForPercentage = key;
  } else if (key === "%" && secondNumber === "") {
    calcScreen.textContent = firstNumber + "%";
  } else if (key === "%" && secondNumber !== "") {
    calcScreen.textContent = secondNumber + "%";
  }

  if (key === "=") {
    const calc = new Сalculator();

    switch (sign) {
      case "+":
        firstNumber = calc.calculateAmount(
          Number(firstNumber),
          Number(secondNumber)
        );
        // firstNumber = calc.calculateAmount(+firstNumber, +secondNumber);
        break;

      case "-":
        firstNumber = calc.countSubtraction(+firstNumber, +secondNumber);
        break;

      case "X":
        if (secondNumber === "") {
          calcScreen.textContent = firstNumber;
          return;
        }
        firstNumber = calc.calculateMultiplication(+firstNumber, +secondNumber);
        break;

      case "/":
        if (secondNumber === "0") {
          calcScreen.textContent = "Ошибка";
          firstNumber = "";
          secondNumber = "";
          sign = "";
          return;
        } else
          firstNumber = calc.calculateDivision(+firstNumber, +secondNumber);
        break;

      case "%":
        firstNumber = calc.calculatePercentage(
          +firstNumber,
          +secondNumber,
          signForPercentage
        );
        calcScreen.textContent = firstNumber;
        signForPercentage = "";
        break;
    }

    finish = true;
    calcScreen.textContent = firstNumber;
    secondNumber = 0;
    sign = "";
  }
};

class Сalculator {
  calculateAmount(firstNumber, secondNumber) {
    return +(firstNumber + secondNumber).toFixed(7);
  }

  countSubtraction(firstNumber, secondNumber) {
    return +(firstNumber - secondNumber).toFixed(7);
  }

  calculateMultiplication(firstNumber, secondNumber) {
    return +(firstNumber * secondNumber).toFixed(7);
  }

  calculateDivision(firstNumber, secondNumber) {
    if (secondNumber === 0) {
      return;
    }
    return +(firstNumber / secondNumber).toFixed(7);
  }

  calculatePercentage(firstNumber, secondNumber, sign) {
    if (secondNumber === 0 && signForPercentage === "") {
      return firstNumber;
    } else if (secondNumber === 0) {
      return firstNumber / 100;
    } else {
      secondNumber = (firstNumber / 100) * secondNumber;

      switch (sign) {
        case "+":
          return this.calculateAmount(firstNumber, secondNumber);
        case "-":
          return this.countSubtraction(firstNumber, secondNumber);
        case "X":
          return this.calculateMultiplication(firstNumber, secondNumber);
        case "/":
          return this.calculateDivision(firstNumber, secondNumber);
      }
    }
  }
}
