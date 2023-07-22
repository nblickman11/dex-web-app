
pragma solidity ^0.5.0;

contract CharityPool {    

    // uint8 start focusing, save gas costs.
    uint8 public WITHDRAW_AMOUNT = 3;
    uint256 public WEI_SCALE = 10**18;

    // Mapping to keep track of whether a user is currently withdrawing or not.
    mapping(address => bool) public locked;

    event Values(uint256);

    mapping(address => uint) public lastWithdrawalTime;
    uint public withdrawalCooldown = 10 seconds; 

    /*
        CharityPool will automatically receive X ETH. Any user can 
        donate. But their amount goes into the cumulative total of the
        contract, and it's no longer associated with their address.
    */
    function contribute() public payable 
    {
        /* 
          If msg.value was, say 2 ETH (when 5 ETH was sent with 
          the transaction) then only 2 ETH gets deposited the contract's
          balance.  The other 3 ETH remain with the user.
          // (bool success, ) = address(this).call.value(msg.value=2)("");
        */
    }

    // Allow withdraw's if the user's hasn't last withdrawn within the cooldown period.
    function withdraw() public 
    {    
        require(WITHDRAW_AMOUNT * WEI_SCALE <= address(this).balance, "Insufficient balance");

        emit Values(WITHDRAW_AMOUNT);

        (bool success, ) = msg.sender.call.value(WITHDRAW_AMOUNT * WEI_SCALE)("");
        require(success, "Failed to transfer funds");

        // NOTE: transaction t1, then t2, could have the same block.timestamp
        // if mined in the same block.  
        // default value for Solidity int is 0 (if msg.sender doesn't exist)
        require(block.timestamp >= lastWithdrawalTime[msg.sender] + withdrawalCooldown, "Cooldown period not over yet");
        lastWithdrawalTime[msg.sender] = block.timestamp;
    }

    // Function's Lock mechanism defends against a reentrancy attack.
    function failedWithdrawAttack() public 
    {    
        require(WITHDRAW_AMOUNT * WEI_SCALE <= address(this).balance, "Insufficient balance");
        
        // If msg.sender is new, they won't exist in the mapping.  Solidity mapping's
        // .. in this case will return the default value of the datatype. Bool's
        // .. default value is False.  So it's not locked!
        require(!locked[msg.sender], "Withdrawal in progress");

        // Set the lock to true to prevent reentrancy attacks
        locked[msg.sender] = true;

        // Line below hashes funcion sig = "fallback1()" into bytes for EVM to read
        bytes memory payload = abi.encodeWithSignature("fallback1()");
        (bool success, ) = msg.sender.call.value(WITHDRAW_AMOUNT * WEI_SCALE)(payload);
        // msg.sender.transfer(WITHDRAW_AMOUNT * WEI_SCALE);  
        require(success, "Failed to transfer funds");

        locked[msg.sender] = false;
    }

    function successfulWithdrawAttack() public 
    {    
        require(WITHDRAW_AMOUNT * WEI_SCALE <= address(this).balance, "Insufficient balance");

        bytes memory payload = abi.encodeWithSignature("fallback2()");
        (bool success, ) = msg.sender.call.value(WITHDRAW_AMOUNT * WEI_SCALE)(payload);
        require(success, "Failed to transfer funds");
    }


    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }


    function receiveEther() external payable 
    {
     //msg.sender.transfer(3000000000000000000);
    }

}
