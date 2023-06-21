pragma solidity ^0.5.0;

import './Token_Interface.sol';
import './Token.sol';
import './NRM_Token.sol';
import './NAR_Token.sol';
import './ADN_Token.sol';
import './WHN_Token.sol';
import './NKF_Token.sol';
import './CIH_Token.sol';
import './NSR_Token.sol';
import './JN_Token.sol';
import './NCN_Token.sol';
import './EHN_Token.sol';
import './JRN_Token.sol';
import './JLN_Token.sol';

contract EthSwap {

	string public name = "Nelson's EthSwap Exchange";

	// Initialize an array of token addresses.
	address[] private tokens;


	event LogMessage(string message);
	event LogMessage2(uint, string);

	event TokensPurchased(
		address account,
		address token,
		uint amount,
		uint rate
	);
	event TokensSold(
		address account,
		address token,
		uint amount,
		uint rate
	);

	mapping(string => TokenInterface) public symbolToInstanceMapping;

	constructor(address[] memory _tokens) public {
		
		tokens = _tokens;

        for (uint i = 0; i < tokens.length; i++) {
        	// Create an instance of type TokenInterface using the address
            TokenInterface tokenInstance = TokenInterface(tokens[i]);
            symbolToInstanceMapping[tokenInstance.getSymbol()] = tokenInstance;
        }
	}

	function buyTokens(string memory currentToken) public payable {

		// Create our token instance to be of the same contract the currentToken specifies
        TokenInterface tokenInstance = symbolToInstanceMapping[currentToken];

        // (tokenAmount you get) = (Amount of ether you'll give) * (Rate of that token)
		uint tokenAmount = msg.value * tokenInstance.getRate();

		// Make sure our exchange has sufficient funds.
		require(tokenInstance.balanceOf(address(this)) >= tokenAmount);

		// Transfer tokens from Exchange to User's Account.
		tokenInstance.transfer(msg.sender, tokenAmount);

		emit TokensPurchased(msg.sender, address(tokenInstance), tokenAmount, tokenInstance.getRate());
	}


	function sellTokens(uint _amount, string memory currentToken) public {

		// Create our token instance to be of the same contract the currentToken specifies
        TokenInterface tokenInstance = symbolToInstanceMapping[currentToken];

		// Make sure user account has enough tokens.
		require(tokenInstance.balanceOf(msg.sender) >= _amount);

        // (etherAmount you get) = (Amount of token you give) / (Rate of that token)
		uint etherAmount = _amount / tokenInstance.getRate();


		// Confirm exchange has enough Ether to give (not "balanceOf": that's for tokens)
		require(address(this).balance >= etherAmount);

		// User approved Exchange to be the spender: allowance[Ganache user][spender] = amount.   
		// So, EthSwap the makes function call to allow tokens to transfer from user to itself.
		tokenInstance.transferFrom(msg.sender, address(this), _amount);

		// This transfer is a built in Solidity function that transfers Eth (Wei)
		// from the contract it's in to the msg.sender account.
		msg.sender.transfer(etherAmount);

		emit TokensSold(msg.sender, address(tokenInstance), _amount, tokenInstance.getRate());
	}
}









