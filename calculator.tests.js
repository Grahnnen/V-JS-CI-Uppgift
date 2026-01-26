/* global describe, test, expect, require */
// eslint-env jest
const { add, subtract, multiply, divide } = require('./calculator.js');

describe('Calculator functions', () => {
    
    describe('add', () => {
        test('should add two positive numbers', () => {
            expect(add(2, 3)).toBe(5);
        });
        
        test('should add negative numbers', () => {
            expect(add(-2, -3)).toBe(-5);
        });
        
        test('should handle decimals', () => {
            expect(add(2.5, 3.1)).toBeCloseTo(5.6);
        });
    });
    
    describe('subtract', () => {
        test('should subtract two numbers', () => {
            expect(subtract(5, 3)).toBe(2);
        });
        
        test('should handle negative results', () => {
            expect(subtract(3, 5)).toBe(-2);
        });
    });
    
    describe('multiply', () => {
        test('should multiply two numbers', () => {
            expect(multiply(4, 5)).toBe(20);
        });
        
        test('should multiply by zero', () => {
            expect(multiply(4, 0)).toBe(0);
        });
        
        test('should multiply negative numbers', () => {
            expect(multiply(-4, 5)).toBe(-20);
        });
    });
    
    describe('divide', () => {
        test('should divide two numbers', () => {
            expect(divide(10, 2)).toBe(5);
        });
        
        test('should handle decimals', () => {
            expect(divide(5.5, 2)).toBeCloseTo(2.75);
        });
        
        test('should throw error when dividing by zero', () => {
            expect(() => divide(10, 0)).toThrow('Kan inte dividera med noll!');
        });
    });
});