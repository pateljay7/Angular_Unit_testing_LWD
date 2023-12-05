import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  it('Should add two numbers', () => {
    // pending() //// for pending test case
    // xit() instead of it() for pending state
    const calculator = new CalculatorService();
    let result = calculator.add(2, 2);
    expect(result).toBe(4);
  });
  it('Should subtract two numbers', () => {
    const calculator = new CalculatorService();
    let result = calculator.subtract(6, 3);
    expect(result).toBe(3);
  });
  it('Should subtract two negative numbers', () => {
    const calculator = new CalculatorService();
    let result = calculator.subtract(-6, -3);
    expect(result).toBe(-3);
  });
});
