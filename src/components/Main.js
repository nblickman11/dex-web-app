// Import the React Library and Component Class from 'react' package.
import React, {Component} from 'react';
// Import code from below files.
import BuyForm from './BuyForm';
import SellForm from './SellForm';
import needNelsonToken from '../Images/needNelson.jpg';
import PropTypes from 'prop-types';

import thoughtBubbleIcon from '../Images/thought-bubble.png';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'buy',
      buyFormVariable: '',
      sellFormVariable: '',
      curTokOracleText: '',
    };
  }

  // Callback function to update the buyFormVariable in Main's state
  updateBuyFormVariable = (value) => {
    this.setState({buyFormVariable: value});
  }
  updateSellFormVariable = (value) => {
    this.setState({sellFormVariable: value});
  }

  render() {
    let content;

    if (this.state.currentForm === 'buy') {
      content = (
        <BuyForm
          reloadBCData={this.props.reloadBCData}
          updateBuyFormVariable={this.updateBuyFormVariable}
          tokenBalanceMapping={this.props.tokenBalanceMapping}
          symbolRateMapping={this.props.symbolRateMapping}
          ethBalance={this.props.ethBalance}
          buyTokens={this.props.buyTokens}
        />
      );
      // When user clicks token button in BuyForm it triggers callback function
      // ..above to update the value to the new current token.
      this.state.curTokOracleText = this.state.buyFormVariable;
    } else {
      content = (
        <SellForm
          reloadBCData={this.props.reloadBCData}
          updateSellFormVariable={this.updateSellFormVariable}
          tokenBalanceMapping={this.props.tokenBalanceMapping}
          symbolRateMapping={this.props.symbolRateMapping}
          ethBalance={this.props.ethBalance}
          sellTokens={this.props.sellTokens}
        />
      );
      // When user clicks token button in SellForm it triggers callback function
      // ..above to update the value to the new current token.
      this.state.curTokOracleText = this.state.sellFormVariable;
    }

    // Use mappings passed as props from the App.js to prepare content for the interface.
    let bp = this.props.symbolBirthPlaceMapping[this.state.curTokOracleText];
    let temp = this.props.symbolTempMapping[this.state.curTokOracleText];
    let name = this.props.symbolNameMapping[this.state.curTokOracleText];

    const thoughtBubble = (
      <div className="thought-bubble-container">
        <img src={thoughtBubbleIcon} className="thought-bubble-image" alt="Thought Bubble" />
        <div className="thought-bubble-content">
          <u className="gold-text oracle-data">Oracle Data</u> <br /><br />
          <span>Symbol:<br /></span> <span className="gold-text">{this.state.curTokOracleText}</span>
          <br /> <br />
          <span>Human Name:<br /></span> <span className="gold-text">{name}</span>
          <br /> <br />
          <span>Birth Place:<br /></span> <span className="gold-text">{bp}</span>
          <br /> <br />
          <span>Temperature in {bp}:<br /></span> <span className="gold-text">{temp}°</span>
        </div>
      </div>
    );

    return (
      <div id="content" className="mt-3">
        
        <div className="d-flex justify-content-between mb-3">

          <button
            className="btn btn-light outlined"
            onClick={(event) => {
              this.setState((prevState) => ({
                currentForm: 'buy',
                buyFormVariable: prevState.currentForm === 'sell' ? 'SELECT' : prevState.buyFormVariable,
              }));
            }}
          >
            Buy
          </button>

          <span className="text-muted">&lt; &nbsp; &gt;</span>

          <button
            className="btn btn-light outlined"
            onClick={(event) => {
              this.setState((prevState) => ({
                currentForm: 'sell',
                sellFormVariable: prevState.currentForm === 'buy' ? 'SELECT' : prevState.sellFormVariable,
              }));
            }}
          >
            Sell
          </button>

        </div>

        <div className="content-container outlined">
          {thoughtBubble}
          {content}
        </div>

        <div className="text-center">
          <img src={needNelsonToken} alt="needNelsonTokenLogo" 
          style={{ width: '300px', height: '300px' }}/>
        </div>

      </div>
    );
  }
}

// Allows App.js to import this with: import Main from './Main';
export default Main;
