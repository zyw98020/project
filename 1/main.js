// script.js
function appendNumber(num) {
    const display = document.getElementById('display');
    if (display.value === '0' || display.value === '') {
        display.value = num;
    } else {
        display.value += num;
    }
}

function appendOperator(op) {
    const display = document.getElementById('display');
    if (display.value !== '' && !isNaN(display.value.slice(-1))) {
        display.value += op;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
    }
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}