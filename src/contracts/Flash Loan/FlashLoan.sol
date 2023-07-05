pragma solidity ^0.5.0;

import '../Eth_Swap.sol';
import '../Parent Contracts/Token_Interface.sol';

// Prevents overflow and underflow errors.
import "../../../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract FlashLoan {


    event LogMessageA(string);

    event eventPostFlashLoan(TokenInterface, uint256);

    EthSwap public ethSwapInstance;
    TokenInterface public tokenInstance;

    uint256 public balanceBefore;
    uint256 public balanceAfter;
    uint256 public fee;
    uint256 public onePercentRate;
    uint256 public inversePercentOfSupply;
    uint256 public ethSwapTokBal;
    uint256 public scaleFactor;
    uint256 public scaledSupply;

    uint256 public CONST = 100;
    uint256 public SCALE_FACTOR = 100000;
    uint256 public WEI_SCALE = 10**18;

    constructor(address exchange) public {
        ethSwapInstance = EthSwap(exchange);
    }

    modifier ensureLoanRepayment() 
    {
        //code before _ runs before executeFlashLoan func.
        // code after this mark runs after the exectueFlashLoan func
        _;
        emit eventPostFlashLoan(tokenInstance, balanceBefore);
        balanceAfter = tokenInstance.balanceOf(address(this));
        require(balanceAfter <= balanceBefore, "Flash loan not repaid");
    }

    function executeFlashLoan(uint256 _loanAmount, string memory currentToken) public ensureLoanRepayment() 
    {

        // Call exchange. Retrieve the instance of the contract based on symbol
        tokenInstance = ethSwapInstance.getTokenInstance(currentToken);

        emit eventPostFlashLoan(tokenInstance, 1);

        // Get this balance for our ensureLoanRepayment check
        balanceBefore = tokenInstance.balanceOf(address(this));

        // Current Ethswap Exchange Supply of token being loaned. (Used for fee calculation)
        ethSwapTokBal = tokenInstance.balanceOf(address(ethSwapInstance));

        // Deposit user's loan to the exchange. (Different from transfer, not passing ether.)
        tokenInstance.deposit(_loanAmount, msg.sender, address(ethSwapInstance));

    /*
        Calculate Interest Fee (paid to the user)
    */
        // If current token blanace is high, the users loan should be worth less.
        // fee = (_loanAmount * .01) + (1 / ethSwapTokBal)
        // NOTE: Solidity has no fractions, so see below.

        // If loan amount is under 100, will give a minimum of 1 wei to user.
        onePercentRate = SafeMath.div(_loanAmount, CONST * WEI_SCALE);
        if (onePercentRate == 0) {
            onePercentRate = 1 * WEI_SCALE;
        }
        
        // 10 mill wei / ethSwapTokBal 500000 wei = you get 20 wei back
        // 10 mill wei / ethSwapTokBal 500 wei = you get 20000 wei back
        // If balance is over 10 million, you get none back.
        scaleFactor = SafeMath.mul(SCALE_FACTOR, WEI_SCALE);
        scaledSupply =  SafeMath.mul(scaleFactor, CONST * WEI_SCALE);
        inversePercentOfSupply = SafeMath.div(scaledSupply, ethSwapTokBal);

        fee = onePercentRate + inversePercentOfSupply;

        // Repay the user.
        tokenInstance.transfer(msg.sender, _loanAmount + fee);


        emit eventPostFlashLoan(tokenInstance, 2);
    }
}




