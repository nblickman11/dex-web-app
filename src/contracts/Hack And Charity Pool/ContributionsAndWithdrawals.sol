
pragma solidity ^0.5.0;


import './CharityPool.sol';

contract ContributionsAndWithdrawals {


    uint8 public WITHDRAW_TO_USER = 2;
    uint256 public WEI_SCALE = 10**18;

    CharityPool public charityPool;

    constructor(address _charityPool) public {
        charityPool = CharityPool(_charityPool);
    }

    event FundsReceived(address sender, uint amount);
    
    // Receive some initial Ether on deployment.
    function receiveEther() external payable 
    {
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }


    // NOTE: with payable the money is automatically sent to Contributions.sol's
    // ..balance.  In this case it's passed on to the CharityPool.sol.
    function contributeToCharity() public payable 
    {
        require(msg.value > 0, "Invalid contribution amount");
        charityPool.contribute.value(msg.value)();
    }



    // Fallback function is automatically executed when charity sends 
    // ..this contract balance Ether
    function() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }


    // This Contract net's 1 Ether by the end of this function call.
    function withdrawFromCharity() public
    {
        // This line withdraws 3 ETH from the Charity to this Contract
        charityPool.withdraw();

        // This line sends 2 ETH from this Contract to the User
        msg.sender.transfer(WITHDRAW_TO_USER * WEI_SCALE);
    }

}
