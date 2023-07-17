
pragma solidity ^0.5.0;


import './CharityPool.sol';

contract ContributionsAndWithdrawals {

    CharityPool public charityPool;

    constructor(address _charityPool) public {
        charityPool = CharityPool(_charityPool);
    }


    // NOTE: with payable the money is automatically sent to Contributions.sol's
    // ..balance.  In this case it's passed on to the CharityPool.sol.
    function contributeToCharity() public payable 
    {
        require(msg.value > 0, "Invalid contribution amount");
        charityPool.contribute.value(msg.value)();
    }


    function withdrawFromCharity() public payable 
    {
        charityPool.withdraw();
    }




}
