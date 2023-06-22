// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

//This pragma enables the experimental ABI encoder feature, 
//which allows encoding and decoding of complex data types 
//such as structs and arrays.
pragma experimental ABIEncoderV2;

import './OracleContract.sol';
import './OracleClient.sol';

contract MockLinkToken {

    string public name = "MockLinkToken";
    string public symbol = "MLINK";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000000000000000000000;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;

    constructor() public {
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function transfer(address recipient, uint256 amount) external returns (bool) {
        require(amount <= balances[msg.sender], "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        return true;
    }

    // Typically would call approve() first, so that we approve
    // the money to be spent.  Prevents a random user from calling
    // transferFrom without approval.
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public returns (bool) {
        require(amount <= balances[sender], "Insufficient balance");
        //require(amount <= allowances[sender][msg.sender], "Insufficient allowance");
        balances[sender] -= amount;
        balances[recipient] += amount;
        //allowances[sender][msg.sender] -= amount;
        return true;
    }

    // function approve(address spender, uint256 amount) external returns (bool) {
    //     // oracleContract is 
    //     allowances[msg.sender][spender] = amount;
    //     return true;
    // }

    // function allowance(address owner, address spender) external view returns (uint256) {
    //     return allowances[owner][spender];
    // }


    // callData needed here to inform compiler you won't modify data passed to it.
    // needed for external function since they have restrictions on how data can be accessed/modified.
    // and the request is a complex data structure.
    function transferFromOracleClient(uint256 _amount, OracleClient.Request calldata _data, address _oracleContract) external {

        transferFrom(msg.sender, _oracleContract, _amount);

        // Invoke the onTokenTransfer function in the Oracle contract
        OracleContract(_oracleContract).onTokenTransfer(msg.sender, _amount, _data);
    }


}
 