pragma solidity ^0.5.0;

/* 
    There is a lot of similarity. Can probably put transfer(),
    approve(), transferFrom() implementations into here and just 
    inherit.
*/

contract BaseTokenContract {
    
    // NOTE: child doesn't inherit the state variables.
    // .. just the function and modifier.
    address private flashLoanAddress;
    address private ethSwapAddress;
    address private deployerAddress;


    constructor() public {
    }

    // IS INHERITED BY child, so each child has its own variable
    // of this that is getting set.
    function setFlashLoanAddress(address _flashLoanAddress) public 
    {
        flashLoanAddress = _flashLoanAddress;
    }

    function setEthSwapAddress(address _ethSwapAddress) public 
    {
        ethSwapAddress = _ethSwapAddress;
    }

    function setDeployerAddress(address _deployerAddress) public 
    {
        deployerAddress = _deployerAddress;
    }

    modifier onlyFlashLoanContract(address originalSender) {
        require(originalSender == flashLoanAddress, "Function can only be called by the FlashLoan contract");
        _;
    }

    modifier fromFlashLoanEthSwapDeployer(address originalSender) {
        require(originalSender == flashLoanAddress ||
         originalSender == ethSwapAddress ||
          originalSender == deployerAddress,
         "Function can only be called by FlashLoan, Ethswap, or Deployer");        
        _;
    }
    
}
