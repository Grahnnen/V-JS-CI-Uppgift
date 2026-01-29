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

describe('edge cases for calculator', () => {
  test('add with zero', () => {
    expect(add(0, 0)).toBe(0);
    expect(add(0, 5)).toBe(5);
    expect(add(5, 0)).toBe(5);
  });

  test('subtract with zero', () => {
    expect(subtract(0, 0)).toBe(0);
    expect(subtract(0, 5)).toBe(-5);
    expect(subtract(5, 0)).toBe(5);
  });

  test('multiply with decimals', () => {
    expect(multiply(2.5, 4)).toBeCloseTo(10);
    expect(multiply(-2.5, 4)).toBeCloseTo(-10);
  });

  test('divide negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
    expect(divide(10, -2)).toBe(-5);
    expect(divide(-10, -2)).toBe(5);
  });

  test('divide with decimals', () => {
    expect(divide(5, 2.5)).toBe(2);
  });

  test('divide by one', () => {
    expect(divide(10, 1)).toBe(10);
  });
});

describe('additional edge cases for calculator', () => {
  test('add with large numbers', () => {
    expect(add(1e6, 1e6)).toBe(2e6);
  });

  test('subtract with large numbers', () => {
    expect(subtract(1e6, 1e5)).toBe(900000);
  });

  test('multiply with large numbers', () => {
    expect(multiply(1e3, 1e3)).toBe(1e6);
  });

  test('divide with large numbers', () => {
    expect(divide(1e6, 1e3)).toBe(1000);
  });

  test('add with NaN', () => {
    expect(add(NaN, 5)).toBeNaN();
    expect(add(5, NaN)).toBeNaN();
  });

  test('subtract with NaN', () => {
    expect(subtract(NaN, 5)).toBeNaN();
    expect(subtract(5, NaN)).toBeNaN();
  });

  test('multiply with NaN', () => {
    expect(multiply(NaN, 5)).toBeNaN();
    expect(multiply(5, NaN)).toBeNaN();
  });

  test('divide with NaN', () => {
    expect(divide(NaN, 5)).toBeNaN();
    expect(divide(5, NaN)).toBeNaN();
  });

  test('add with Infinity', () => {
    expect(add(Infinity, 1)).toBe(Infinity);
    expect(add(-Infinity, 1)).toBe(-Infinity);
  });

  test('subtract with Infinity', () => {
    expect(subtract(Infinity, 1)).toBe(Infinity);
    expect(subtract(-Infinity, 1)).toBe(-Infinity);
  });

  test('multiply with Infinity', () => {
    expect(multiply(Infinity, 2)).toBe(Infinity);
    expect(multiply(-Infinity, 2)).toBe(-Infinity);
  });

  test('divide with Infinity', () => {
    expect(divide(Infinity, 2)).toBe(Infinity);
    expect(divide(-Infinity, 2)).toBe(-Infinity);
  });
});