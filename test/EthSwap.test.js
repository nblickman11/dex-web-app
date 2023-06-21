
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

// JavaScript test framework.
require('chai')
	.use(require('chai-as-promised'))
	.should()

// Helper function converts Ether to Wei (Ether * 10**18)
function tokens(n) {
	return web3.utils.toWei(n, 'ether');
}

// TESTS

	/*
    - [Deployer, investor] = first and second account in Ganache.
    - Contract is a truffle function.  
	*/ 
contract('EthSwap', ([deployer, investor]) => {
  let tokenContracts = [];
  let tokenNames = ["Nelson Blickman", "Nelson Mandela", "Nelson Rockefeller",
   "Alice Nelson", "Willie Nelson", "Nelly Furtado", "Cornell Haynes (Nelly)",
   "Nelson Riddle", "Jameer Nelson", "Novella Nelson", "Eric (Ricky) Nelson",
    "Jordy Nelson", "Jesy Nelson"];
  let contract; 
  let token, nrmToken, narToken, adnToken, whnToken, nkfToken, 
  cihToken, nsrToken, jnToken, ncnToken, ehnToken, jrnToken, jlnToken;

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
      contract = await EthSwap.new(
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
      );
      console.log("\tEthSwap contract deployed successfully!\n");
    } catch (error) {
      console.error("Error deploying EthSwap contract!:", error);
    }

	  /*
      - "deployer" sends it's token supply (it got from Token.sol on initialization)
         to the EthSwap contract's account.
	  */ 
		await token.transfer(contract.address, tokens('1000000'));
  });

	

  // TESTS

  // Anonymous asynchronous JS func.
	describe('Token Contracts Deployed', async () => {
	  //console.log("KH", tokenContracts)
	  for (let i = 0; i < 13; i++) {
	    // Constructor is a special function in Solidity that retrieves the contract's name
	    it(`Name of the ${tokenNames[i]} contract is correct.`, async () => {
	      const name = await tokenContracts[i].name();
	      assert.equal(name, tokenNames[i]);
	    });

	    it(`Name of the ${tokenNames[i]} contract is not correct.`, async () => {
	      const name = await tokenContracts[i].name();
	      assert.notEqual(name, "Wrong Name");
	    });
	  }
	});


  describe('Exchange Contract Deployed', async () => {
	  it('Name of the exchange contract is correct.', async() => {
      const name = await contract.name()
      assert.equal(name, "Nelson's EthSwap Exchange")
    })
		it('Exchange has 1 million tokens after deployment.', async() => {
			let balance = await token.balanceOf(contract.address)
			assert.equal(balance.toString(), tokens('1000000'))
		})
		it('Exchange does not have 1 million tokens after deployment.', async () => {
  		let balance = await token.balanceOf(contract.address);
  		assert.notEqual(balance.toString(), tokens('1000000') + '1'); // Add 1 wei to the expected value
		});
  })


  describe('buyTokens()', async() => {
    let result
		
		before(async() => {
  		const ethContractInst = new web3.eth.Contract(
  			EthSwapJSONFile.abi, contract.address);

  		// Ganache account 1 buys tokens from the Exchange.
    	await ethContractInst.methods.buyTokens("NTB").send({from: deployer, 
    		value: web3.utils.toWei('1', 'ether')})
		})

  	it('User purchases tokens from Exchange', async()=>{
  		let deployerBalance = await token.balanceOf(deployer)
  		// Ganache account will contain 100 Nelson tokens now.
  		assert.equal(deployerBalance.toString(), tokens('100'), "Deployer account balance is incorrect")

  		// Confirm exchange's new token balance.
  		let exchangeBalance
  		exchangeBalance = await token.balanceOf(contract.address)
  		// Exchange started with 1000000 Nelson Tokens, take away 100.
  		assert.equal(exchangeBalance.toString(), tokens('999900'))
  		
  		// Confirm exchange's new eth balance.  Use Web3 library to call the BC
  		// ..and get balance associated with the contract's address.
  		exchangeBalance = await web3.eth.getBalance(contract.address)
  		assert.equal(exchangeBalance.toString(), web3.utils.toWei('1', 'ether'))
  	})
  })

  describe('sellTokens()', async() => {
    let result;
		let initialDeployerEtherBalance;

		before(async() => {
			initialDeployerEtherBalance = await web3.eth.getBalance(deployer);
			console.log("CHECK", initialDeployerEtherBalance);
			// Ganache account approves the Exchange to spend the money.
			await token.approve(contract.address, tokens('100'), {from: deployer})
			
			// Deployer sells it's tokens back to the Exchange.
			result = await contract.sellTokens(tokens('100'),"NTB", {from: deployer})
		})

		it('User sells tokens to Exchange', async()=>{
			
			// Check deployer's new token balance
			let deployerBalance = await token.balanceOf(investor)
			assert.equal(deployerBalance.toString(), tokens('0'))

			// Check exchange's new token balance
			let exchangeBalance
			exchangeBalance = await token.balanceOf(contract.address)
			assert.equal(exchangeBalance.toString(), tokens('1000000'))
  		
  		// Confirm ether balance of Ganache account increased
			const deployerEtherBalance = await web3.eth.getBalance(deployer);
			assert.isAbove(parseInt(deployerEtherBalance),
			 parseInt(initialDeployerEtherBalance));

  		// Confirm exchange's new eth balance.  Use Web3 library to call the BC
  		// ..and get balance associated with the contract's address.
  		exchangeBalance = await web3.eth.getBalance(contract.address)
			assert.equal(exchangeBalance.toString(), web3.utils.toWei('0', 'ether'))

			// Investor doesn't have enough tokens to sell
			// "should.be.rejected" uses Chai assertion library syntax.
			await contract.sellTokens(tokens('500'), 
				{from: deployer}).should.be.rejected;

		})

		it('TokenSold Event emits the correct information', async()=>{
			const event = result.logs[0].args
			assert.equal(event.account, deployer)
			assert.equal(event.token, token.address)
			assert.equal(event.amount.toString(), tokens('100').toString())
			assert.equal(event.rate.toString(), '100')
  	})
	})
})

