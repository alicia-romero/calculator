const ERROR = "ERROR";

let lastCommand = null;
let lastOperator = null;
let number1 = 0;
let number2 = 0;
let result = 0;
let currentResult = 0;

const resultNode = document.querySelector("#result");
const assignNode = document.querySelector("#assign");
const decimalNode = document.querySelector("#decimal");
const percentageNode = document.querySelector("#percentage");
const signNode = document.querySelector("#sign");

function showResult() {
  resultNode.innerHTML = result;
}

function clearAll() {
  lastCommand = null;
  lastOperator = null;
  number1 = 0;
  number2 = 0;
  result = 0;
  currentResult = 0;
  showResult();
}

function assignNumToResult(num, numId = 0) {
  result = num;
  currentResult = numId;
}

function calculateResult() {
  if (lastOperator.id == "add") {
    number1 += number2;
  } else if (lastOperator.id == "subtract") {
    number1 -= number2;
  } else if (lastOperator.id == "multiply") {
    number1 *= number2;
  } else if (number2 !== 0) {
    number1 /= number2;
  } else {
    assignNumToResult(ERROR, -1);
    showResult();
    return;
  }
  number2 = 0;
  assignNumToResult(number1, 1);
}

// Clear all after ERROR or result
document.querySelectorAll(".grid-item").forEach((node) => {
  node.addEventListener("click", () => {
    if (
      result === ERROR ||
      (node.className == "grid-item number" && lastCommand == assignNode)
    ) {
      clearAll();
    }
  });
});

document.querySelectorAll(".number").forEach((numberNode) => {
  numberNode.addEventListener("click", () => {
    if (number1 === 0 && currentResult === 0) {
      clearAll();
      number1 += parseInt(numberNode.textContent);
      assignNumToResult(number1, 1);
    } else if (
      number2 === 0 &&
      (lastCommand.className == "grid-item number" ||
        lastCommand.className == "grid-item num-op")
    ) {
      if (Number.isInteger(number1)) {
        number1 = parseInt(`${number1}${numberNode.textContent}`);
      } else {
        number1 = parseFloat(`${number1}${numberNode.textContent}`);
      }
      assignNumToResult(number1, 1);
    } else if (
      number2 === 0 &&
      !(
        lastCommand.className == "grid-item number" ||
        lastCommand.className == "grid-item num-op"
      )
    ) {
      number2 += parseInt(numberNode.textContent);
      assignNumToResult(number2, 2);
    } else if (
      lastCommand.className == "grid-item number" ||
      lastCommand.className == "grid-item num-op"
    ) {
      if (Number.isInteger(number2)) {
        number2 = parseInt(`${number2}${numberNode.textContent}`);
      } else {
        number2 = parseFloat(`${number2}${numberNode.textContent}`);
      }
      assignNumToResult(number2, 2);
    }
    showResult();
    lastCommand = numberNode;
  });
});

signNode.addEventListener("click", () => {
  if (result !== 0 && currentResult === 1) {
    number1 *= -1;
    assignNumToResult(number1, 1);
  } else if (result !== 0 && currentResult === 2) {
    number2 *= -1;
    assignNumToResult(number2, 2);
  } else if (result !== 0) {
    result *= -1;
    assignNumToResult(result);
  }
  showResult();
  lastCommand = signNode;
});

percentageNode.addEventListener("click", () => {
  if (currentResult === 1) {
    number1 *= 0.01;
    assignNumToResult(number1, 1);
  } else if (currentResult === 2) {
    number2 *= 0.01;
    assignNumToResult(number2, 2);
  } else {
    result *= 0.01;
    assignNumToResult(result);
  }
  showResult();
  lastCommand = percentageNode;
});

decimalNode.addEventListener("click", () => {
  if (currentResult === 1 && Number.isInteger(number1)) {
    number1 += ".";
    assignNumToResult(number1, 1);
  } else if (currentResult === 2 && Number.isInteger(number2)) {
    number2 += ".";
    assignNumToResult(number2, 2);
  } else if (Number.isInteger(result)) {
    result += ".";
    assignNumToResult(result);
  }
  showResult();
  lastCommand = decimalNode;
});

document.querySelectorAll(".operator").forEach((operatorNode) => {
  operatorNode.addEventListener("click", () => {
    if (currentResult === 2) {
      calculateResult();
    }
    lastCommand = operatorNode;
    lastOperator = operatorNode;
  });
});

assignNode.addEventListener("click", () => {
  calculateResult();
  showResult();
  lastCommand = assignNode;
});
