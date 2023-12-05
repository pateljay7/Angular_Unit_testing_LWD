describe('First test', () => {
  let testVariable: any;

  beforeEach(() => {
    testVariable = {};
  });

  it('Should return true if a is true', () => {
    //arrage the data
    testVariable.a = false;

    //act or check logic
    testVariable.a = true;

    //assert
    expect(testVariable.a).toBe(true);
  });
});
