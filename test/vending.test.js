const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compilerOutput = require("../compile");
const interface = compilerOutput.abi;
const bytecode = compilerOutput.evm.bytecode.object;

let accounts;
let vending;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    vending = await new web3.eth.Contract(interface).deploy({data: bytecode}).send({ from: accounts[0], gas: "1000000" });
});

describe('vending', () => {
    it('deploys a contract', () => {
        assert.ok(vending.options.address);
    });
    it('getDonutBalance', async () => {
        const balance = await vending.methods.getVendingMachineBalance().call();
        assert.equal(balance, '100');
    });
    it('restock', async () => {
        //const result = await vending.methods.restock('20').send({from:accounts[1]});
        assert.ok(vending.methods.restock('20').send({from:accounts[1]}), false);
    });
});