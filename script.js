// script.js - UI-logik

window.calculate = function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultElement = document.getElementById('result');
    
    if (isNaN(num1) || isNaN(num2)) {
        resultElement.textContent = 'Ange båda talen!';
        resultElement.style.color = 'red';
        return;
    }
    
    let result;
    
    try {
        switch(operation) {
            case 'add':
                result = window.add(num1, num2);
                break;
            case 'subtract':
                result = window.subtract(num1, num2);
                break;
            case 'multiply':
                result = window.multiply(num1, num2);
                break;
            case 'divide':
                result = window.divide(num1, num2);
                break;
        }
        
        resultElement.textContent = `Resultat: ${result}`;
        resultElement.style.color = '#333';
    } catch (error) {
        resultElement.textContent = error.message;
        resultElement.style.color = 'red';
    }
}