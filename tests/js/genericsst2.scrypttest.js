
const {
    expect
} = require('chai');
const {
    buildContractClass,
    buildTypeClasses
} = require('scryptlib');
const {
    compileContract
} = require('../../helper');

describe('GenericStruct  test', () => {

    describe('test genericsst2', () => {
        let c, result;

        const C = buildContractClass(compileContract('genericsst2.scrypt'));
        const { ST0, ST1} = buildTypeClasses(C);
        before(() => {
            
            c = new C(new ST0({
                x: [false],
                y: [1,2,3]
            }));
        });

        it('should unlock successfully', () => {

            result = c.unlock(new ST0({
                x: true,
                y: 1
            }), new ST0({
                x: [false],
                y: [1,2,3]
            })).verify();

            expect(result.success, result.error).to.be.true
        })


        it('should unlock fail', () => {

            result = c.unlock(new ST0({
                x: true,
                y: 1
            }), new ST0({
                x: [false],
                y: [1,2,31]
            })).verify();

            expect(result.success, result.error).to.be.false
        })


    });
});