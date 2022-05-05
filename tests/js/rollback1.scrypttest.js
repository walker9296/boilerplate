const { expect } = require('chai');
const { bsv, buildContractClass, getPreimage, toHex, num2bin, SigHashPreimage } = require('scryptlib');

const {
  inputIndex,
  inputSatoshis,
  newTx,
  DataLen,
  compileContract
} = require('../../helper');

const tx = newTx();
const outputAmount = 222222

describe('Test sCrypt contract Rollback1 In Javascript', () => {
  let rollback1, preimage, result

  before(() => {
    const Rollback1 = buildContractClass(compileContract('rollback1.scrypt'))
    rollback1 = new Rollback1(1, 3)


    tx.addOutput(new bsv.Transaction.Output({
      script: rollback1.lockingScript,
      satoshis: outputAmount
    }))


    // set txContext for verification
    rollback1.txContext = {
      tx,
      inputIndex,
      inputSatoshis
    }
  });

  it('should succeed when pushing right preimage ', () => {
    preimage = getPreimage(tx, rollback1.lockingScript, inputSatoshis)

    result = rollback1.f1(new SigHashPreimage(toHex(preimage)), 1).verify()
    expect(result.success, result.error).to.be.true
  });


});