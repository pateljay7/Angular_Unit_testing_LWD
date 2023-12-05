import { LoggerService } from '../logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  it('Should add two numbers', () => {
    // pending() //// for pending test case
    // xit() instead of it() for pending state
    // let loggerService = new LoggerService();
    // mock logger service for spy,it will not touch original service
    let mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    // .and.callTrough() call original services along with spyOn
    // spyOn(loggerService, 'log').and.callThrough();
    const calculator = new CalculatorService(mockLoggerService);
    let result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
  it('Should subtract two numbers', () => {
    let mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    const calculator = new CalculatorService(mockLoggerService);
    let result = calculator.subtract(6, 3);
    expect(result).toBe(3);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
  it('Should subtract two negative numbers', () => {
    let mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    const calculator = new CalculatorService(mockLoggerService);
    let result = calculator.subtract(-6, -3);
    expect(result).toBe(-3);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
});
