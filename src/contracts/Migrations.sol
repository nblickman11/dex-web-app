pragma solidity >=0.4.21 <0.6.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  // On deployment, the owner of the contract is set.
  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  /* 
    - Typical Steps:
      1. Your old Migration contract has been deployed of course.  Since this
         contract currently exists on the chain.
      2. Deploy the new version of the contract, call it "NewMigrations".
      3. Obtain the address of the newly deployed "NewMigrations" contract.
      4. Call the upgrade method on the original "Migrations" contract, 
         passing the address of the "NewMigrations" contract as a parameter.
    
    - It's a bit confusing since we are making a new instance of the new
      contract, even though it's already deployed.  But, this will pass 
      the state of the old contract to the "setCompleted" of the new contract.
      NOTE***: This contract is a bit misleading and may not be typical. For 
      example, it's typically wouldn't make sense to pass in the state of the
      old contract to the new one.  
  */ 
  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
