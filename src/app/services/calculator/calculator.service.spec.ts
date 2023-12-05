import { LoggerService } from '../logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  it('Should add two numbers', () => {
    // pending() //// for pending test case
    // xit() instead of it() for pending state
    let loggerService = new LoggerService();
    // .and.callTrough() call original services along with spyOn
    spyOn(loggerService, 'log').and.callThrough();
    const calculator = new CalculatorService(loggerService);
    let result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });
  it('Should subtract two numbers', () => {
    let loggerService = new LoggerService();
    spyOn(loggerService, 'log').and.callThrough();
    const calculator = new CalculatorService(loggerService);
    let result = calculator.subtract(6, 3);
    expect(result).toBe(3);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });
  it('Should subtract two negative numbers', () => {
    let loggerService = new LoggerService();
    spyOn(loggerService, 'log').and.callThrough();
    const calculator = new CalculatorService(loggerService);
    let result = calculator.subtract(-6, -3);
    expect(result).toBe(-3);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });
});
