import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  beforeEach(() => {
    service = new LoggerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should not have any messages at starting', () => {
    expect(service.messages.length).toBe(0);
  });
  it('should add the message when log is called', () => {
    service.log('message');
    service.log('message1');
    expect(service.messages.length).toBe(2);
  });
  it('should clear all the messages when clear called', () => {
    service.log('message 1');
    service.log('message 2');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
