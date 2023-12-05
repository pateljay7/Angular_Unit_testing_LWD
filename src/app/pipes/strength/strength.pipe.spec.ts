import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('create an instance', () => {
    const pipe = new StrengthPipe();
    expect(pipe).toBeTruthy();
  });
  it('should display weak if value is less then 10', () => {
    const pipe = new StrengthPipe();
    let number = Math.floor(Math.random() * 10);
    expect(pipe.transform(number)).toEqual(`${number} (weak)`);
  });
  it('should display strong if value is >=10 and <20', () => {
    const pipe = new StrengthPipe();
    let number = Math.floor(Math.random() * (19 - 10 + 1)) + 10;
    expect(pipe.transform(number)).toEqual(`${number} (strong)`);
  });
  it('should display strongest if value is >20', () => {
    const pipe = new StrengthPipe();
    let number =
      Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 20)) + 20;
    expect(pipe.transform(number)).toEqual(`${number} (strongest)`);
  });
});
