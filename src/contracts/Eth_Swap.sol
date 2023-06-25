pragma solidity ^0.5.0;

import './Token_Interface.sol';
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

	// passing entire mappings in solidity are not easy.  They don't
	// provide direct access to their stored keys/values like arrays.
	// Not iterable go retrieve them all either.
	mapping(string => TokenInterface) public symbolToInstanceMapping;

	constructor(address[] memory _tokens) public {
		
		tokens = _tokens;

        for (uint i = 0; i < tokens.length; i++) {
        	// Create an instance of type TokenInterface using the address
            TokenInterface tokenInstance = TokenInterface(tokens[i]);
            symbolToInstanceMapping[tokenInstance.getSymbol()] = tokenInstance;
        }
	}

	// Getter function to retrieve the token instance for a given symbol
    function getTokenInstance(string calldata symbol) external view returns (TokenInterface) {
        return symbolToInstanceMapping[symbol];
     }

	// NOTE: consider calldata, not memory.  since currentToken is read only, and 
	// .. would save gas by not having to make a copy the parameter
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









