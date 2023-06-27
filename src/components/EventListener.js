
const Web3 = require('web3');

const contractArtifact = require('../abis/EthSwap.json');
const contractArtifact2 = require('../abis/OracleClient.json');
const artifactFlashLoan = require('../abis/FlashLoan.json');

// Check if MetaMask is available
if (window.ethereum) {
  // Use MetaMask provider
  const web3 = new Web3(window.ethereum);

  // Request MetaMask to enable accounts
  window.ethereum.enable().catch((error) => {
    console.error('Error enabling accounts', error);
  });



  // Retrieve the contract address from the artifact file
  const contractAddress = contractArtifact.networks['5777'].address;

  // Create a contract instance
  const contractABI = contractArtifact.abi;
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  //Listen to the LogMessage event
  const logMessageEvent = contract.events.LogMessage();
  logMessageEvent.on('data', (event) => {
    const message = event.returnValues.message;
    console.log('LogMessage:', message);
  });
  logMessageEvent.on('error', console.error);



  // Retrieve the contract address from the artifact file
  const contractAddress2 = contractArtifact2.networks['5777'].address;

  // Create a contract instance
  const contractABI2 = contractArtifact2.abi;
  const contract2 = new web3.eth.Contract(contractABI2, contractAddress2);

  //Listen to the request volume event
  const requestVolumeEvent = contract2.events.RequestVolume();
  requestVolumeEvent.on('data', (event) => {
    // can remove .volume if just want the whole object
    const message2 = event.returnValues.volume;
    console.log('RequestVolume:', message2);
  });
  requestVolumeEvent.on('error', console.error);

  //Listen to the event
  const clientTestEvent = contract2.events.ClientTest();
  clientTestEvent.on('data', (event) => {
    const message3 = event.returnValues.apple;
    console.log('ClientTest:', message3);
  });
  clientTestEvent.on('error', console.error);




  // Retrieve the contract address from the artifact file
  const addressFlashLoan = artifactFlashLoan.networks['5777'].address;

  // Create a contract instance
  const flashLoanABI = artifactFlashLoan.abi;
  const flashLoan = new web3.eth.Contract(flashLoanABI, addressFlashLoan);

  //Listen to the LogMessageA event
  const eventLogMes = flashLoan.events.LogMessageA();
  eventLogMes.on('data', (event) => {
    const values = event.returnValues;
    console.log('eventLogMes:', values);
  });
  eventLogMes.on('error', console.error);


  //Listen to the request volume event
  const eventFlashLoan = flashLoan.events.eventPostFlashLoan();
  eventFlashLoan.on('data', (event) => {
    const values = event.returnValues;
    console.log('eventFlashLoan:', values);
  });
  eventFlashLoan.on('error', console.error);

}