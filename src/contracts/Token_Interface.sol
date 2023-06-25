pragma solidity ^0.5.0;

interface TokenInterface {

    function getRate() external view returns (uint);
    function getSymbol() external view returns (string memory);
    
    function deposit(uint256, address, address) external returns (bool);

    function transfer(address, uint256) external returns (bool);
    function approve(address, uint256) external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);


    // view means it will only read from the contract, not modifing it.
    function balanceOf(address) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
}
