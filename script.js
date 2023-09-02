const visor = document.querySelector('#monitor');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operator');
var currentInput = '';
var firstValue = null;
var operator = null;

for(var i = 0; i < numbers.length ;i++){
    numbers[i].textContent = i;
    numbers[i].setAttribute('data-value',(i).toString());
    numbers[i].addEventListener("click", displayValue);
}

for (var i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", setOperator);
}

document.addEventListener("keydown", function(event) {
    const keyPressed = event.key;

    if (/^[0-9]$/.test(keyPressed)) {
        handleNumberInput(keyPressed);
    } else if (keyPressed === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateVisor();
    } else if (keyPressed === "Enter") {
        performCalculation();
    }
});

function displayValue(event) {
    const clickedNumber = event.target.getAttribute('data-value');
    handleNumberInput(clickedNumber);
}

function handleNumberInput(number) {
    if (operator === null) {
        currentInput = '';
    }
    currentInput += number;
    updateVisor();
}

function setOperator(event) {
    if (firstValue === null) {
        firstValue = parseFloat(currentInput);
        operator = event.target.getAttribute('data-value');
        currentInput = '';
    } else {
        performCalculation();
        operator = event.target.getAttribute('data-value');
    }
}

function performCalculation() {
    if (firstValue !== null && operator !== null) {
        const secondValue = parseFloat(currentInput);
        let result = 0;

        switch (operator) {
            case "+":
                result = firstValue + secondValue;
                break;
            case "-":
                result = firstValue - secondValue;
                break;
            case "*":
                result = firstValue * secondValue;
                break;
            case "/":
                result = firstValue / secondValue;
                break;
        }

        firstValue = result.toString();
        operator = null;
        currentInput = result.toString();
        updateVisor();
    }
}

function updateVisor() {
    visor.textContent = currentInput;
}