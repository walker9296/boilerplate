const { expect } = require('chai');
const { buildContractClass, Bytes, readLaunchJson } = require('scryptlib');
const { randomBytes } = require('crypto');
const { compileContract } = require('../../helper');


function and(ba, bb) {
  const buffer = Buffer.alloc(ba.length);
  for (let i = 0; i < ba.length; i++) {
    buffer[i] = ba[i] & bb[i];
  }
  return buffer;
}

function or(ba, bb) {
  const buffer = Buffer.alloc(ba.length);
  for (let i = 0; i < ba.length; i++) {
    buffer[i] = ba[i] | bb[i];
  }
  return buffer;
}

function xor(ba, bb) {
  const buffer = Buffer.alloc(ba.length);
  for (let i = 0; i < ba.length; i++) {
    buffer[i] = ba[i] ^ bb[i];
  }
  return buffer;
}

function invert(ba) {
  const buffer = Buffer.alloc(ba.length);
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = ~ba[i];
  }
  return buffer;
}



describe('Test sCrypt contract Issue506 In Javascript', () => {
  let test, result

  before(() => {
    const Issue506 = buildContractClass(compileContract('issue506.scrypt'));
    test = new Issue506();
  });

  it('should return true', () => {


    let counter = 10000;

    while (--counter > 0) {
      const e = randomBytes(32);
      const f = randomBytes(32);
      const g = randomBytes(32);


      result = test.and(new Bytes(e.toString('hex')),
        new Bytes(f.toString('hex')), new Bytes(and(e, f).toString('hex'))).verify()

      if (result.success === false) {
        console.log(JSON.stringify(readLaunchJson(result.error)))
      }
      expect(result.success, result.error).to.be.true

      result = test.or(new Bytes(e.toString('hex')),
        new Bytes(f.toString('hex')), new Bytes(or(e, f).toString('hex'))).verify()

      if (result.success === false) {
        console.log(JSON.stringify(readLaunchJson(result.error)))
      }
      expect(result.success, result.error).to.be.true


      result = test.xor(new Bytes(e.toString('hex')),
        new Bytes(f.toString('hex')), new Bytes(xor(e, f).toString('hex'))).verify()

      if (result.success === false) {
        console.log(JSON.stringify(readLaunchJson(result.error)))
      }
      expect(result.success, result.error).to.be.true


      result = test.invert(new Bytes(e.toString('hex')),
        new Bytes(invert(e).toString('hex'))).verify()

      if (result.success === false) {
        console.log(JSON.stringify(readLaunchJson(result.error)))
      }
      expect(result.success, result.error).to.be.true



      let r = xor(and(e, f), and(invert(e), g))

      result = test.unlock(new Bytes(e.toString('hex')), 
        new Bytes(f.toString('hex')),
        new Bytes(g.toString('hex')),
        new Bytes(r.toString('hex'))).verify()

      if (result.success === false) {
        console.log(JSON.stringify(readLaunchJson(result.error)))
      }
      expect(result.success, result.error).to.be.true

    }

  });

});
