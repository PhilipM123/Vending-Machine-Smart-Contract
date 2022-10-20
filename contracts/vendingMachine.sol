// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract VendingMachine {
    address public owner;
    mapping (address => uint) public donutBalance;

    constructor () {
        owner = msg.sender;
        donutBalance[address(this)] = 100;
    }

    function getVendingMachineBalance () public view returns (uint) {
        return donutBalance[address(this)];
    }

    function restock(uint amount) public payable {
        require(msg.sender == owner, "Error, only the owner can restock the vending machine.");
        require(donutBalance[address(this)] >= amount, "Not enough donuts.");
        require(msg.value >= amount * 1 ether, "Error, each donut costs 1 Ether to restock.");
        donutBalance[address(this)] += amount;
    }

    function purchase(uint amount) public payable {
        require(msg.value >= amount * 2 ether, "Error, please send at least 2 ether per donut");
        donutBalance[address(this)] -= amount;
        donutBalance[msg.sender] += amount;
    }
}