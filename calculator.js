// calculator.js - Enkla räkneoperationer

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
    if (b === 0) {
        throw new Error('Kan inte dividera med noll!');
    }
    return a / b;
}

// Exportera för Jest
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { add, subtract, multiply, divide };
}