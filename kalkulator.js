console.log("Selamat Anda berhasil menggunakan JavaScript pada Website")

const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNUmber: false
};

function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = '0';
  calculator.opertor = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNUmber = false;
}

function inputDigit(digit) {
  if (calculator.waitingForSecondNUmber && calculator.firstNumber === calculator.displayNumber) {
    calculator.displayNumber = digit;
  } else {
    if(calculator.displayNumber === '0') {
      calculator.displayNumber = digit;
    } else {
      calculator.displayNumber += digit;
    }
  }
}

function inverseNumber () {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
  if (!calculator.waitingForSecondNUmber) {
    calculator.operator = operator;
    calculator.waitingForSecondNUmber = true;
    calculator.firstNumber = calculator.displayNumber;
  } else {
    alert ('Operator sudah ditetapkan')
  }
}

function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
  }
  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener('click', function(event) {
    const target = event.target;

    if(target.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if(target.classList.contains('negative')) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if(target.classList.contains('equals')) {
      performCalculation();
      updateDisplay();
      return;
    }

    if(target.classList.contains('operator')) {
      handleOperator(target.innerText)
      updateDisplay();
      return;
    }

    inputDigit(target.innerText);
    updateDisplay()
  });
}
