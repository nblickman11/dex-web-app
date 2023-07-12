
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
    address public ethSwapAddress;
    address public deployerAddress;
    BaseTokenContract[] public childrenArray;

    // Using Polymorphism. Instantiate child, set it to parent type.
    constructor(address _flashLoanAddress, address _ethSwapAddress, 
        address[] memory _tokens) public 
    {
        flashLoanAddress = _flashLoanAddress;   
        ethSwapAddress = _ethSwapAddress;
        deployerAddress = msg.sender;

        childrenArray.push(Token(_tokens[0]));
        childrenArray.push(NRM_Token(_tokens[1]));
        childrenArray.push(NAR_Token(_tokens[2]));
        childrenArray.push(ADN_Token(_tokens[3]));
        childrenArray.push(WHN_Token(_tokens[4]));
        childrenArray.push(NKF_Token(_tokens[5]));
        childrenArray.push(CIH_Token(_tokens[6]));
        childrenArray.push(NSR_Token(_tokens[7]));
        childrenArray.push(JN_Token(_tokens[8]));
        childrenArray.push(NCN_Token(_tokens[9]));
        childrenArray.push(EHN_Token(_tokens[10]));
        childrenArray.push(JRN_Token(_tokens[11]));
        childrenArray.push(JLN_Token(_tokens[12]));

        setAddressesForTokens();
    }

    function setAddressesForTokens() internal
    {
        for (uint i = 0; i < childrenArray.length; i++) 
        {
            BaseTokenContract child = childrenArray[i];
            child.setFlashLoanAddress(flashLoanAddress);
            child.setEthSwapAddress(ethSwapAddress);
            child.setDeployerAddress(deployerAddress);
        }
    }

}
