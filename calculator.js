// calculator.js - Enkla räkneoperationer
/* eslint-disable no-undef */


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

// Export for Jest (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { add, subtract, multiply, divide };
}

// Attach to window for browser
if (typeof window !== 'undefined') {
    window.add = add;
    window.subtract = subtract;
    window.multiply = multiply;
    window.divide = divide;
}