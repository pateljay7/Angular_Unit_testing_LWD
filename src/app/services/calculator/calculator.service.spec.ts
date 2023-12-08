import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let mockLoggerService: any,
    calculator: any,
    loggerServiceSpy: jasmine.SpyObj<LoggerService>;
  beforeEach(() => {
    // let loggerService = new LoggerService();
    // mock logger service for spy,it will not touch original service
    // mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    // calculator = new CalculatorService(mockLoggerService);
    // using testbed
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    });
    calculator = TestBed.inject(CalculatorService);
    // we can create like that too
    loggerServiceSpy = TestBed.inject(
      LoggerService
    ) as jasmine.SpyObj<LoggerService>;
  });
  it('Should add two numbers', () => {
    // pending() //// for pending test case
    // xit() instead of it() for pending state
    // .and.callTrough() call original services along with spyOn
    // spyOn(loggerService, 'log').and.callThrough();
    let result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
  it('Should subtract two numbers', () => {
    let result = calculator.subtract(6, 3);
    expect(result).toBe(3);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
  it('Should subtract two negative numbers', () => {
    let result = calculator.subtract(-6, -3);
    expect(result).toBe(-3);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
});
