
// Exchange Contracts
const EthSwap = artifacts.require("EthSwap");

// Token Contracts
const Token = artifacts.require("Token");
const NRM_Token = artifacts.require("NRM_Token");
const NAR_Token = artifacts.require("NAR_Token");
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

// Oracle Related Contracts
const OracleClient = artifacts.require("OracleClient");
const OracleContract = artifacts.require("OracleContract");
const MockLinkToken = artifacts.require("MockLinkToken");

// Charity Related Contracts
const CharityPool = artifacts.require("CharityPool");
const ContributionsAndWithdrawals = artifacts.require("ContributionsAndWithdrawals");
const ReentrancyAttack = artifacts.require("ReentrancyAttack");

// Flash Loan Related Contracts
const FlashLoan = artifacts.require("FlashLoan");

// Deploy the BaseTokenContract so the Contract Registry can 
// .. can pass the flash loan address to it.
const BaseTokenContract = artifacts.require("BaseTokenContract");

// Contract Registry
const ContractRegistry = artifacts.require("ContractRegistry");


module.exports = async function(deployer) { 


  const accounts = await web3.eth.getAccounts();

  const tokenArtifacts = [Token, NRM_Token, NAR_Token, ADN_Token, WHN_Token,
    NKF_Token, CIH_Token, NSR_Token, JN_Token, NCN_Token, EHN_Token,
    JRN_Token, JLN_Token, OracleContract, MockLinkToken];
  
  const tokenInstances = [];

  // Deploy the contract artifacts and return the contract instances
  for (const TokenArtifact of tokenArtifacts) {
      await deployer.deploy(TokenArtifact);
      const tokenInstance = await TokenArtifact.deployed();
      tokenInstances.push(tokenInstance);
  }

  // Deploy the EthSwap contract and return it's instance 
  const tokenInstancesSlice = tokenInstances.slice(0, 13);
  await deployer.deploy(EthSwap, tokenInstancesSlice.map(token => token.address));
  const ethSwap = await EthSwap.deployed() //Grab ethSwap contract inst.


  // Deploy and return instances of Charity related contracts.
  await deployer.deploy(CharityPool)
  const charityPool = await CharityPool.deployed();
  await deployer.deploy(ContributionsAndWithdrawals, charityPool.address)
  await deployer.deploy(ReentrancyAttack, charityPool.address)


  // Deploy Oracle client and the addresses it talks to, and return it's instance.
  await deployer.deploy(OracleClient, tokenInstances[13].address, 
    tokenInstances[14].address)
  const oracleClient = await OracleClient.deployed();

  // Deploy Flash Loan and the address it talks to.
  await deployer.deploy(FlashLoan, ethSwap.address)
  const flashLoan = await FlashLoan.deployed();

  // Deploy and return the BaseTokenContract
  await deployer.deploy(BaseTokenContract);
  const baseTokenContract = await BaseTokenContract.deployed();

  // Deploy and return the Contract Registry
  await deployer.deploy(ContractRegistry, flashLoan.address, ethSwap.address,
    tokenInstancesSlice.map(token => token.address), {from: accounts[0]});

  const contractRegistry = await ContractRegistry.deployed();


  /* 
    - When the 13 ERC-20 token contracts were deployed, truffle automatically set the 
     first Ganache account as the deployer (assigning it the supply for each). 

    - So below we transfer 1 million tokens from the Ganache account to 
      the EthSwap's contract balance, for each of the 13 token contracts

    - And transfer the other 1 (of 2 total) million to the FlashLoan's Contract.
  */ 
  const transferAmount = '1000000000000000000000000';
  for (let i = 0; i <= 12; i++) {
    const tokenInstance = tokenInstances[i];
    await tokenInstance.transfer(ethSwap.address, transferAmount);
    await tokenInstance.transfer(flashLoan.address, transferAmount);
  }

  // Send 1 million of Ganache account's MockLinkTokens to the OracleClient.
  await tokenInstances[14].transfer(oracleClient.address, transferAmount);



};


