pragma solidity ^0.5.0;

/* 
    There is a lot of similarity. Can probably put transfer(),
    approve(), transferFrom() implementations into here and just 
    inherit.
*/

contract BaseTokenContract {
    
    // Child inherits this
    address public flashLoanAddress;

    constructor() public {
    }

    // IS INHERITED BY child, so each child has its own variable
    // of this that is getting set.
    function setFlashLoanAddress(address _flashLoanAddress) public 
    {
        flashLoanAddress = _flashLoanAddress;
    }

    modifier onlyFlashLoanContract(address originalSender, address flashLoan) {
        require(originalSender == flashLoan, "Function can only be called by the FlashLoan contract");
        _;
    }
    
}
