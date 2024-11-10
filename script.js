function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Error: Division by 0!";
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('currentCalc');
const previousDisplay = document.getElementById('previousCalc');

function appendNumber(number) {
    if (shouldResetDisplay) resetDisplay();
    if (display.textContent === '0' && number !== '.') {
        display.textContent = number;
    } else if (number === '.' && !display.textContent.includes('.')) {
        display.textContent += number;
    } else if (number !== '.') {
        display.textContent += number;
    }
}


function chooseOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = parseFloat(display.textContent);
    currentOperator = operator;
    previousDisplay.textContent = `${firstOperand} ${operator}`;
    shouldResetDisplay = true;
}

function resetDisplay() {
    display.textContent = '';
    shouldResetDisplay = false;
}

function clearCalculator() {
    display.textContent = '0';
    previousDisplay.textContent = '';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
}

function deleteLastDigit() {
    display.textContent = display.textContent.slice(0, -1) || '0';
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    if (currentOperator === '/' && display.textContent === '0') {
        display.textContent = "Error: Division by 0!";
        currentOperator = null;
        return;
    }
    secondOperand = parseFloat(display.textContent);
    display.textContent = roundResult(operate(currentOperator, firstOperand, secondOperand));
    previousDisplay.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    currentOperator = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');
const decimalButton = document.getElementById('decimal');

numberButtons.forEach(button =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach(button =>
    button.addEventListener('click', () => chooseOperator(button.textContent))
);

decimalButton.addEventListener('click', () => appendNumber(decimalButton.textContent));

clearButton.addEventListener('click', clearCalculator);
deleteButton.addEventListener('click', deleteLastDigit);
equalsButton.addEventListener('click', evaluate);
