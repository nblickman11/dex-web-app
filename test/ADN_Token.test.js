
// Require (truffle) artifacts from the json files.
const Token = artifacts.require('Token')
const NRMTOKEN = artifacts.require('NRM_Token')
const NARTOKEN = artifacts.require('NAR_Token')
const ADN_Token = artifacts.require("ADN_Token");
const WHN_Token = artifacts.require("WHN_Token");
const NKF_Token = artifacts.require("NKF_Token");
const CIH_Token = artifacts.require("CIH_Token");
const NSR_Token = artifacts.require("NSR_Token");
const JN_Token = artifacts.require("JN_Token");
const NCN_Token = artifacts.require("NCN_Token");
const EHN_Token = artifacts.require("EHN_Token");
const JRN_Token = artifacts.require("JRN_Token");
const JLN_Token = artifacts.require("JLN_Token");
const EthSwap = artifacts.require('EthSwap')
import EthSwapJSONFile from '../src/abis/EthSwap.json';

// Flash Loan Related Contracts
const FlashLoan = artifacts.require("FlashLoan");

// Contract Registry Contract
const ContractRegistry = artifacts.require("ContractRegistry");

// JavaScript test framework.
require('chai')
	.use(require('chai-as-promised'))
	.should()

const truffleAssert = require('truffle-assertions');


// Helper function converts Ether to Wei (Ether * 10**18)
function tokens(n) {
	return web3.utils.toWei(n, 'ether');
}

// TESTS

	/*
    - [Deployer, investor] = first and second account in Ganache.
    - Contract is a truffle function.  
	*/ 
contract('FlashLoan', ([deployer, investor]) => {
  let tokenContracts = [];
  let tokenNames = ["Nelson Blickman", "Nelson Mandela", "Nelson Rockefeller",
   "Alice Nelson", "Willie Nelson", "Nelly Furtado", "Cornell Haynes (Nelly)",
   "Nelson Riddle", "Jameer Nelson", "Novella Nelson", "Eric (Ricky) Nelson",
    "Jordy Nelson", "Jesy Nelson"];
  let contract; 
  let token, nrmToken, narToken, adnToken, whnToken, nkfToken, 
  cihToken, nsrToken, jnToken, ncnToken, ehnToken, jrnToken, jlnToken;
  let flashLoan;
  let contractRegistry;
  let tokensAddresses;

  before(async () => {
  	// Use Promise.all to make sure all of the tokens deploy before moving on.
    try {
      tokenContracts = [token, nrmToken, narToken, adnToken, whnToken, nkfToken, cihToken,
       nsrToken, jnToken, ncnToken, ehnToken, jrnToken,
        jlnToken] = await Promise.all([
        Token.new(),
        NRMTOKEN.new(),
        NARTOKEN.new(),
        ADN_Token.new(),
        WHN_Token.new(),
        NKF_Token.new(),
        CIH_Token.new(),
        NSR_Token.new(),
        JN_Token.new(),
        NCN_Token.new(),
        EHN_Token.new(),
        JRN_Token.new(),
        JLN_Token.new(),
      ]);
      console.log("\n\tToken contracts deployed successfully!\n");
    } catch (error) {
      console.error("Error deploying token contracts!:", error);
    }

    try {
		  tokensAddresses = [
		    token.address,
		    nrmToken.address,
		    narToken.address,
		    adnToken.address,
		    whnToken.address,
		    nkfToken.address,
		    cihToken.address,
		    nsrToken.address,
		    jnToken.address,
		    ncnToken.address,
		    ehnToken.address,
		    jrnToken.address,
		    jlnToken.address
		  ];
  		contract = await EthSwap.new(tokensAddresses);
      console.log("\tEthSwap contract deployed successfully!\n");
    } catch (error) {
      console.error("Error deploying EthSwap contract!:", error);
    }

	  	flashLoan = await FlashLoan.new(contract.address);
      contractRegistry = await ContractRegistry.new(flashLoan.address, contract.address,
       tokensAddresses);


	  /*
      - "deployer" sends it's token supply (it got from Token.sol on initialization)
         to the EthSwap contract's account.
	  */ 
		for (let i = 0; i < tokenContracts.length; i++) {
      await tokenContracts[i].transfer(contract.address, tokens('1000000'));
      await tokenContracts[i].transfer(flashLoan.address, tokens('1000000'));
    }

  });

	
  /*  


    TESTS


  */

  describe('ADN Token()', async() => {
    // Balance of FlashLoan contract for a token
  	let loanAmount;
		const currentToken = "ADN";

		before(async() => {

			loanAmount = tokens('2');
      // Make sure investor and deployer have tokens to begin with.
      const ethContractInst = new web3.eth.Contract(
        EthSwapJSONFile.abi, contract.address);

      // 7 ADN tokens
      await ethContractInst.methods.buyTokens(currentToken).send({from: deployer, 
        value: web3.utils.toWei('1', 'ether')})

      await ethContractInst.methods.buyTokens(currentToken).send({from: investor, 
        value: web3.utils.toWei('1', 'ether')})
		})

		it('Test Transfer Function Modifier', async()=> {

      // Should work, deployer is approved
      await adnToken.transfer(contract.address, loanAmount, {from: deployer});

      // Should fail, investor is not approved
      await truffleAssert.reverts(
        adnToken.transfer(contract.address, loanAmount, {from: investor}),
        "Function can only be called by FlashLoan, Ethswap, or Deployer"        
        );
    })
	
  })





})

