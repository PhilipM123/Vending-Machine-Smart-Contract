const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compilerOutput = require("./compile");
const interface = compilerOutput.abi;
const bytecode = compilerOutput.evm.bytecode.object;

const provider = new HDWalletProvider(
    //  'insert 12 word private phrase here',
    // 'insert testnet api link here',
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(interface).deploy({data: bytecode,arguments: ["Hi there!"],}).send({ from: accounts[0], gas: "1000000" });
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();