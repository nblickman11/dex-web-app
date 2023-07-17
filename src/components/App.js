// Import the React Library and Component Class from 'react' package.
import React, {Component} from 'react';

import Web3 from 'web3';

import {Link, Route, Routes, Switch} from 'react-router-dom';


// Import code from below files.
import Navbar from './Navbar';
import Main from './Main';
import FlashLoanMain from './FlashLoanMain';
import EthSwap from '../abis/EthSwap.json';
import FlashLoan from '../abis/FlashLoan.json';
import './css/App.css';

// Import abi files
import Token from '../abis/Token.json';
import NRM_Token from '../abis/NRM_Token.json';
import NAR_Token from '../abis/NAR_Token.json';
import ADN_Token from '../abis/ADN_Token.json';
import WHN_Token from '../abis/WHN_Token.json';
import NKF_Token from '../abis/NKF_Token.json';
import CIH_Token from '../abis/CIH_Token.json';
import NSR_Token from '../abis/NSR_Token.json';
import JN_Token from '../abis/JN_Token.json';
import NCN_Token from '../abis/NCN_Token.json';
import EHN_Token from '../abis/EHN_Token.json';
import JRN_Token from '../abis/JRN_Token.json';
import JLN_Token from '../abis/JLN_Token.json';
import OracleClient from '../abis/OracleClient.json';

// Import logo
import blockLogo from '../Images/Block.jpg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      tokenContracts: [],
      tokenBalanceMapping: {},
      symbolRateMapping: {},
      symbolTempMapping: {},
      symbolNameMapping: {},
      symbolBirthPlaceMapping: {},
      symbolInstanceMapping: {},
      ethSwap: {},
      flashLoan: {},
      ethBalance: '0',
      // loading: we are waiting for data to be fetched. Load completes before render content to the page.
      loading: true,
      showBlockLogo: true,
    };
  }

  /* Define and return() the code */
  render() {
    const { history } = this.props;
    let content;
    
    if (this.state.loading) {
      // Show loading message if data is being loaded
      content = <p id="loader" className="text-center">Loading...</p>;
    } else {
      // Pass props to main, and render the main component.
      content = 
        <Main
          reloadBCData={this.reloadBCData}
          tokenBalanceMapping={this.state.tokenBalanceMapping}
          symbolRateMapping={this.state.symbolRateMapping}
          symbolTempMapping={this.state.symbolTempMapping}
          symbolNameMapping={this.state.symbolNameMapping}
          symbolBirthPlaceMapping={this.state.symbolBirthPlaceMapping}
          ethBalance={this.state.ethBalance}
          buyTokens={this.buyTokens}
          sellTokens={this.sellTokens}
      />;
    }

    {/* Return the code to the UI */}
    return (
      <div>
        {/* Return the Navbar component */}
        <Navbar account={this.state.account} />
        
    {/* The Logo Block on the Left */}
        <div className="container-fluid mt-5">
          <div className="row">
            {/* Display the Block logo if loading is complete */}
            {!this.state.loading && this.state.showBlockLogo && (
              <div className="col-lg-1">
                <img src={blockLogo} alt="Block Logo" className="block-logo" />
                {/* Return it's the blocks content. */}
                <div className="block-text">
                  <p className="more-features">More Features</p>
                  {/* Links in the Block */}
                  <Link to="/flashloan" className="block-logo-links" onClick={this.handleFlashLoanClick}>
                    Provide a Flash Loan
                  </Link>
                  <Link to="/charity" className="block-logo-links" onClick={this.handleFlashLoanClick}>
                    Provide a Flash Loan
                  </Link>
                </div>
              </div>
            )}

    {/* Return the content from "/Main" */}
            <main role="main" className="col-lg-5 ml-auto mr-auto"
              style={{maxWidth: '600px'}}>
              <div className="content mr-auto ml-auto">
                <Routes>
                  <Route path="/" element={content} exact />
                  
    {/* Return the content from "/FlashLoanMain" */}
                  <Route
                    path="/flashloan" 
                      element={
                        <FlashLoanMain
                          backToMain={this.backToMain}
                          tokenBalanceMapping={this.state.tokenBalanceMapping}
                          executeFlashLoan={this.executeFlashLoan}
                          reloadBCData={this.reloadBCData} 
                        />}
                  />
                </Routes>
              </div>
            </main>

          </div>
        </div>
      </div>
    );
  }

  // Call back function.
  backToMain = () => {
    this.setState({showBlockLogo: true});
  }

  handleFlashLoanClick = () => {    
    this.setState({showBlockLogo: false});
  };

  /**
   * // React calls componentDidMount() after render() is called
   */
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // Loads the web3 instance to connect to MetaMask.
  // "window" is a global JS object that represents the browser.
  //  When MetaMask is injected into browser, it makes the .ethereum
  //  ..attribute available to the window object.
  // 
  async loadWeb3() {
    try {
      // window.ethereum will only run if metamask is detected.
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        // Line below window.web3 is deprecated and not used.
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
            'Non-Ethereum browser detected. Consider trying MetaMask!');
      }
    } catch (error) {
        console.error(error);
    }
  }

  async loadBlockchainData() {
    
    // Store our provider into a single variable.
    const web3 = window.web3;

    // Return the MetaMask accounts
    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) {
      throw new Error('No accounts found. Please connect to MetaMask and refresh the page.');
    }
    this.setState({account: accounts[0]});

    // Return balance of user account
    const ethBalance = await web3.eth.getBalance(this.state.account);
    if (Number(ethBalance) === 0) {
      throw new Error('Your MetaMask wallet has 0 funds. Please add funds to your wallet.');
    }
    this.setState({ethBalance: ethBalance});

    // Return Ganache node network ID.
    const networkId = await web3.eth.net.getId();

    // Pull deployment data out of the Exchange's abi
    const ethSwapData = EthSwap.networks[networkId];
    // If EthSwapData exists, meaning, it's deployed in the network.
    if (ethSwapData) {
      // ethSwap = an instance of web3's Contract class.
      const ethSwap = new web3.eth.Contract(
          EthSwap.abi, ethSwapData.address);
      this.setState({ethSwap: ethSwap});
    } else {
      window.alert('EthSwap contract not deployed to detected network.');
    }

    // Do the same for the flash loan contract.
    const flashLoanData = FlashLoan.networks[networkId];
    if (flashLoanData) {
      const flashLoan = new web3.eth.Contract(
          FlashLoan.abi, flashLoanData.address);
      this.setState({flashLoan: flashLoan});
    } else {
      window.alert('FlashLoan contract not deployed to detected network.');
    }

    const tokenBalanceMapping = {'SELECT': 0};
    const symbolRateMapping = {'SELECT': 0};
    const symbolTempMapping = {};
    const symbolNameMapping = {'SELECT': '?'};
    const symbolBirthPlaceMapping = {'SELECT': '?'};
    const symbolInstanceMapping = {}
    const tokenContractsData = [
      Token,
      NRM_Token,
      NAR_Token,
      ADN_Token,
      WHN_Token,
      NKF_Token,
      CIH_Token,
      NSR_Token,
      JN_Token,
      NCN_Token,
      EHN_Token,
      JRN_Token,
      JLN_Token,
    ];

    const dataArray = await this.getOracleData();

    const tokenContracts = await Promise.all(tokenContractsData.map(async (contractData, index) => {
      // If contractData.networks exists, operator will take the second argument: contractData.networks[networkId]
      const tokenData = contractData.networks && contractData.networks[networkId];
      // If tokenData exists, grab it's address.
      const contractAddress = tokenData ? tokenData.address : undefined;
      
      // Create Instance
      const contractInstance = new web3.eth.Contract(contractData.abi, contractAddress);

      // Get symbol and add to symbol to instance mapping
      const sym = await contractInstance.methods.getSymbol().call();
      symbolInstanceMapping[sym] = contractInstance;

      // Add to symbol to balance mapping
      const bal = await contractInstance.methods.balanceOf(this.state.account).call();
      tokenBalanceMapping[sym] = bal;

      // Get rate and add to symbol to rate mapping
      const rate = await contractInstance.methods.getRate().call();
      symbolRateMapping[sym] = rate;

      // Get birth place and add to symbol to birth place mapping
      const birthPlace = await contractInstance.methods.getBirthPlace().call();
      symbolBirthPlaceMapping[sym] = birthPlace;

      // Get name and add to symbol to name mapping
      const name = await contractInstance.methods.getName().call();
      symbolNameMapping[sym] = name;

      // Symbol to temperature mapping.
      symbolTempMapping[sym] = dataArray[index];

      return contractInstance;

    }));

    this.setState({
      tokenContracts: tokenContracts,
      symbolInstanceMapping: symbolInstanceMapping,
      tokenBalanceMapping: tokenBalanceMapping, 
      symbolRateMapping: symbolRateMapping,
      symbolTempMapping: symbolTempMapping,
      symbolNameMapping: symbolNameMapping,
      symbolBirthPlaceMapping: symbolBirthPlaceMapping
    });

    this.setState({loading: false});
  }


  async getOracleData() {
    
    // Store our web3 instance from above into single variable.
    const web3 = window.web3;
    
    // Return Ganache node network ID.
    const networkId = await web3.eth.net.getId();

    // Grab data that contains deployment details.
    const oracleClientData = OracleClient.networks[networkId];

    if (oracleClientData) {
      const oracleClient = new web3.eth.Contract(
          OracleClient.abi, oracleClientData.address);

          // Request the oracle data be sent to the oracle client
          // .catch will catch if someone hits "reject" to the pop up.
          // NOTE if change to .call() you can get away from the pop up message.
          // but then wouldn't be able to do something like emit an event!
          await oracleClient.methods.requestOracleData().send(
            {from: this.state.account},
          ).catch((error) => {
              console.error(error);
           });

          // Return data from the client to our application
          return await oracleClient.methods.getData().call();
    }
  }

  // A callback function that's triggered on a token exchange to load fresh BC data to update the page.
  reloadBCData = () => {
    this.loadBlockchainData();
  }

  executeFlashLoan = (tokenAmount, currentToken) => {
  this.setState({ loading: true });

  this.state.flashLoan.methods
    .executeFlashLoan(tokenAmount, currentToken)
    .send({from: this.state.account})
    .on('transactionHash', (hash) => {
      this.setState({ loading: false });
    })
    .catch((error) => {
      console.error(error);
    });
};


  buyTokens = (etherAmount, currentToken) => {
  this.setState({ loading: true });

  this.state.ethSwap.methods
    .buyTokens(currentToken)
    .send({ value: etherAmount, from: this.state.account })
    .on('transactionHash', (hash) => {
      this.setState({ loading: false });
    })
    .catch((error) => {
      console.error(error);
    });
};

  sellTokens = async (tokenAmount, currentToken) => {
    this.setState({ loading: true });

    // sell tokens is async, but .send doesn't return a promise obejct,
    // ..so need to wrap code in a promsie object to make it asynchronous. 
    await new Promise((resolve, reject) => {
      this.state.symbolInstanceMapping[currentToken].methods
        .approve(this.state.ethSwap._address.toString(), tokenAmount)
        .send({ from: this.state.account })
        .on('transactionHash', (hash) => {
          resolve();
        })
      .catch((error) => {
        console.error(error);
        this.loadBlockchainData();
      });
    });

    await this.state.ethSwap.methods
      .sellTokens(tokenAmount, currentToken)
      .send({ value: 0, from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false });
      })
    .catch((error) => {
      console.error(error);
    });

  };
}

export default App;
