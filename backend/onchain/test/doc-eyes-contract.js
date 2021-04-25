/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { DocEyesContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('DocEyesContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new DocEyesContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"doc eyes 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"doc eyes 1002 value"}'));
    });

    describe('#docEyesExists', () => {

        it('should return true for a doc eyes', async () => {
            await contract.docEyesExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a doc eyes that does not exist', async () => {
            await contract.docEyesExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createDocEyes', () => {

        it('should create a doc eyes', async () => {
            await contract.createDocEyes(ctx, '1003', 'doc eyes 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"doc eyes 1003 value"}'));
        });

        it('should throw an error for a doc eyes that already exists', async () => {
            await contract.createDocEyes(ctx, '1001', 'myvalue').should.be.rejectedWith(/The doc eyes 1001 already exists/);
        });

    });

    describe('#readDocEyes', () => {

        it('should return a doc eyes', async () => {
            await contract.readDocEyes(ctx, '1001').should.eventually.deep.equal({ value: 'doc eyes 1001 value' });
        });

        it('should throw an error for a doc eyes that does not exist', async () => {
            await contract.readDocEyes(ctx, '1003').should.be.rejectedWith(/The doc eyes 1003 does not exist/);
        });

    });

    describe('#updateDocEyes', () => {

        it('should update a doc eyes', async () => {
            await contract.updateDocEyes(ctx, '1001', 'doc eyes 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"doc eyes 1001 new value"}'));
        });

        it('should throw an error for a doc eyes that does not exist', async () => {
            await contract.updateDocEyes(ctx, '1003', 'doc eyes 1003 new value').should.be.rejectedWith(/The doc eyes 1003 does not exist/);
        });

    });

    describe('#deleteDocEyes', () => {

        it('should delete a doc eyes', async () => {
            await contract.deleteDocEyes(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a doc eyes that does not exist', async () => {
            await contract.deleteDocEyes(ctx, '1003').should.be.rejectedWith(/The doc eyes 1003 does not exist/);
        });

    });

});
