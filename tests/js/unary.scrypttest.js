const { expect } = require('chai');
const { buildContractClass } = require('scryptlib');
const { compileContract } = require('../../helper');

describe('Test sCrypt contract Exit In Javascript', () => {
  let test, result

  before(() => {
    const Test = buildContractClass(compileContract('unary.scrypt'));
    test = new Test();
  });

  it('should return true', () => {
    result = test.unlock(1, 1).verify()
    expect(result.success, result.error).to.be.true
  });

  it('should throw error', () => {
    result = test.unlock(-1, 1).verify()
    expect(result.success, result.error).to.be.false
  });
});
