
pragma solidity ^0.5.0;

import './Parent Contracts/BaseTokenContract.sol';

import './ERC-20 Tokens/Token.sol';
import './ERC-20 Tokens/NRM_Token.sol';
import './ERC-20 Tokens/NAR_Token.sol';
import './ERC-20 Tokens/ADN_Token.sol';
import './ERC-20 Tokens/WHN_Token.sol';
import './ERC-20 Tokens/NKF_Token.sol';
import './ERC-20 Tokens/CIH_Token.sol';
import './ERC-20 Tokens/NSR_Token.sol';
import './ERC-20 Tokens/JN_Token.sol';
import './ERC-20 Tokens/NCN_Token.sol';
import './ERC-20 Tokens/EHN_Token.sol';
import './ERC-20 Tokens/JRN_Token.sol';
import './ERC-20 Tokens/JLN_Token.sol';

contract ContractRegistry {

    address public flashLoanAddress;
    BaseTokenContract[] public myArray;

    // Using Polymorphism. Instantiate child, set it to parent type.
    constructor(address _flashLoanAddress, address[] memory _tokens) public 
    {
        flashLoanAddress = _flashLoanAddress;   

        myArray.push(Token(_tokens[0]));
        myArray.push(NRM_Token(_tokens[1]));
        myArray.push(NAR_Token(_tokens[2]));
        myArray.push(ADN_Token(_tokens[3]));
        myArray.push(WHN_Token(_tokens[4]));
        myArray.push(NKF_Token(_tokens[5]));
        myArray.push(CIH_Token(_tokens[6]));
        myArray.push(NSR_Token(_tokens[7]));
        myArray.push(JN_Token(_tokens[8]));
        myArray.push(NCN_Token(_tokens[9]));
        myArray.push(EHN_Token(_tokens[10]));
        myArray.push(JRN_Token(_tokens[11]));
        myArray.push(JLN_Token(_tokens[12]));

        setFlashLoanAddressForTokens();
    }

    function setFlashLoanAddressForTokens() internal
    {
        for (uint i = 0; i < myArray.length; i++) 
        {
            myArray[i].setFlashLoanAddress(flashLoanAddress);
        }
    }

}
