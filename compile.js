const path = require('path');
const fs = require('fs');
const solc = require('solc');

const vendingPath = path.resolve(__dirname, 'contracts', 'vendingMachine.sol');
const source = fs.readFileSync(vendingPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'vendingMachine.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', "evm.bytecode"],
            },
        },
    },
};

const compile = JSON.parse(solc.compile(JSON.stringify(input)));
module.exports = compile.contracts['vendingMachine.sol']['VendingMachine'];