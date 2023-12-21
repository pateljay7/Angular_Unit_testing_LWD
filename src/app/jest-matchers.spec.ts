describe('Jest Matchers', () => {
  it('toBe() : check for the === (strict equality)', () => {
    let a: any = '1',
      b: any = '1';
    expect(2 + 2).toBe(4);
    expect(a).toBe(b);
  });
  it('toEqual() : used to perform deep equality checks', () => {
    let obj1 = { a: 1, b: 2 };
    let obj2 = { b: 1, a: 1 };
    expect(2 + 2).toEqual(4);
    expect(obj1).not.toEqual(obj2);
  });
  it('toBeTruthy() : used to check Truthy Values', () => {
    expect('1').toBeTruthy();
    expect('false').toBeTruthy();
    expect(true).toBeTruthy();
    expect({}).toBeTruthy();

    // just to check boolean true
    expect(null).not.toBeTrue();
  });
  it('toBeFalsy() : used to check Falsy Values', () => {
    expect('').toBeFalsy();
    expect('true').not.toBeFalsy();
    expect(false).toBeFalsy();
    expect({}).not.toBeFalsy();

    // just to check boolean false
    expect(false).toBeFalse();
    expect('false').not.toBeFalse();
  });

  it('Truthiness ', () => {
    let a;
    let b = null;
    expect(null).toBeNull();
    expect(b).toBeNull();
    expect(a).not.toBeNull();
    expect(a).toBeUndefined();
    expect(b).toBeFalsy();
    expect(a).not.toBeTruthy();
  });

  it('Testing number value', () => {
    expect(10.0).toEqual(10);
    expect(10.0).toBe(10);

    let price = 30;
    expect(price).toBeLessThan(40);
    expect(price).toBeLessThanOrEqual(30);
    expect(price).toBeGreaterThan(29);

    expect(5 / 0).toBePositiveInfinity();
  });
  it('Testing floating value', () => {
    let value = 0.1 + 0.2; // 0.30000000000000004
    let a = 7.0002,
      b = 7.0001;
    expect(value).not.toBe(0.3);
    expect(value).not.toEqual(0.3);
    expect(a).toBeCloseTo(b, 3); // 3 for specified precision
    expect(a).not.toBeCloseTo(b, 4);
  });

  it('Testing string value', () => {
    const name = `jay patel`;
    expect(name).toEqual('jay patel');

    expect(name).toMatch(/[a-z]/);
    expect(name).not.toMatch(/[0-9]/);
    expect(name).not.toMatch(/[$_-]/);

    expect(name).toContain('jay'); //check for including sub string
  });

  it('should contain specific instance type', () => {
    class User {
      constructor(private name: string, private id: number) {}
    }
    enum Day {
      monday,
      tuesday,
      wednesday,
    }
    let date = Day.monday;
    let user = new User('jay', 2176);
    expect(1).toBeInstanceOf(Number);
    expect('jay').toBeInstanceOf(String);
    expect(true).toBeInstanceOf(Boolean);
    expect(Math).toBeInstanceOf(Object);
    expect(date).toBeInstanceOf(Number);
    expect(user).toBeInstanceOf(User);
  });

  it('Testing Arrays and iterables', () => {
    const numbers = [1, 2, 3, 4];
    // expect(numbers).toBe([1, 2, 3, 4]); // Tobe() is just used for primitive types
    expect(numbers).toEqual([1, 2, 3, 4]);
    expect(numbers).toContain(1);
    expect(numbers).not.toContain(7);
    expect(numbers).toHaveSize(4);
  });
});
