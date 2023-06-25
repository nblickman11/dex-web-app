import React, {Component} from 'react';
import ethLogo from '../Images/eth-logo.png';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

//Logos
import generalTokenLogo from '../Images/General_logo.jpg';
import ntbLogo from '../nelsonImages/NTB_logo.jpg';
import nrmLogo from '../nelsonImages/NRM_logo.jpg';
import narLogo from '../nelsonImages/NAR_logo.jpg';
import adnLogo from '../nelsonImages/ADN_logo.jpg';
import whnLogo from '../nelsonImages/WHN_logo.jpg';
import nkfLogo from '../nelsonImages/NKF_logo.jpg';
import cihLogo from '../nelsonImages/CIH_logo.jpg';
import nsrLogo from '../nelsonImages/NSR_logo.jpg';
import jnLogo from '../nelsonImages/JN_logo.jpg';
import ncnLogo from '../nelsonImages/NCN_logo.jpg';
import ehnLogo from '../nelsonImages/EHN_logo.jpg';
import jrnLogo from '../nelsonImages/JRN_logo.jpg';
import jlnLogo from '../nelsonImages/JLN_logo.jpg';

// Import Bootstrap and Jquery (which are downloaded in node_modules)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


class BuyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentToken: 'SELECT',
      output: '0',
      tokenInfo: {
        SELECT: {logo: generalTokenLogo},
        NTB: { logo: ntbLogo},
        NRM: { logo: nrmLogo},
        NAR: { logo: narLogo},
        ADN: { logo: adnLogo},
        WHN: { logo: whnLogo},
        NKF: { logo: nkfLogo},
        CIH: { logo: cihLogo},
        NSR: { logo: nsrLogo},
        JN:  { logo: jnLogo},
        NCN: { logo: ncnLogo},
        EHN: { logo: ehnLogo},
        JRN: { logo: jrnLogo},
        JLN: { logo: jlnLogo},
      },
    };
  }

  /**
   * Render method.
   * @return {JSX.Element} SellForm JSX template.
   * "className" is attribute assigns CSS class "mb-3" to the form
   * The onSubmit attribute sets an event handler function that gets
   * ..called when the form is submitted.
   */
  render() {

    // Create array of the keys of the tokenInfo object.
    const tokenList = Object.keys(this.state.tokenInfo);

    return (
      /* Render the form */
      <form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (this.state.currentToken == "SELECT") {
            alert('First select which Nelson you want to buy!');
          } else {
            let etherAmount = this.input.value.toString();
            etherAmount = window.web3.utils.toWei(etherAmount, 'Ether');
            this.props.buyTokens(etherAmount, this.state.currentToken);
            this.props.reloadBCData();
          }
        }}
      >

      {/* INPUT SECTION */}
        {/* span element float-right text-muted displays the balance info on the right. */}
        <div>
          <label className="float-left">
            <b>Input</b>
          </label>
          <span style={{ fontWeight: 'bold' }} className="float-right text-muted">
            Your Balance: {parseFloat(window.web3.utils.fromWei(this.props.ethBalance, 'Ether')).toFixed(2)} ETH
          </span>
        </div>

        <div className="input-group mb-4">
          {this.state.currentToken === 'SELECT' ? (
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="First Select a Nelson to Buy!"
              disabled
            />
          ) : (
          <input
            type="text"
            onChange={(event) => {
              const etherAmount = this.input.value.toString();
              this.setState({
                output: etherAmount * this.props.symbolRateMapping[this.state.currentToken],
              });
            }}
            ref={(input) => {
              this.input = input;
            }}
            className="form-control form-control-lg"
            placeholder="0"
            required
          />)}

          <div className="input-group-append">
            {/* Display ETH logo */}
            <div className="input-group-text">
              <img src={ethLogo} height="32" alt="ETH Logo" />
              &nbsp;&nbsp;&nbsp; ETH
            </div>
          </div>
        </div>


        {/* OUTPUT SECTION */}

        <div>
          {/* Output label and balance */}
          <label className="float-left">
            <b>Output</b>
          </label>
            <span style={{ fontWeight: 'bold' }} className="float-right text-muted">
              Your Balance: {parseFloat(window.web3.utils.fromWei(this.props.tokenBalanceMapping[this.state.currentToken].toString(), 'Ether')).toFixed(2)} Tokens
            </span>

        </div>

        <div className="input-group mb-2">
          {/* Display the calculated output amount */}
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}
            disabled
          />

          

          <div className="input-group-append">
            
            {/* TOKEN DROPDOWN */}
            <div className="btn-group">
              
              <button
                type="button"
                className="btn btn-outline-secondary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <img src={this.state.tokenInfo[this.state.currentToken].logo} height="32" alt="Token Logo" />
                &nbsp; {this.state.currentToken}
              </button>
              
              <div className="dropdown-menu token-scrollable-menu">
                {tokenList.slice(1).map((token) => (
                  <button
                    key={token}
                    className="dropdown-item"
                    onClick={() => {
                     this.setState({ currentToken: token });
                     this.props.updateBuyFormVariable(token);
                   }}
                  >
                    <img src={this.state.tokenInfo[token].logo} height="40" alt={`${token} Logo`} />
                    &nbsp; {token}
                  </button>
                ))}
              </div>

             </div> {/* this div ends the button group*/}

          </div>
        </div>

        <div className="mb-2">
          {/* Exchange rate */}
          <span className="float-left text-muted"><b>Exchange Rate</b></span>
          <span className="float-right text-muted"><b>1 ETH = {this.props.symbolRateMapping[this.state.currentToken]} Nelson Tokens</b></span>
        </div>

        {/* The button element has a type attribute with a
        submit button value, which when clicked renders the form.*/}
        <button type="submit" className="btn btn-primary btn-block btn-lg">
          SWAP!
        </button>
      </form>
    );
  }
}


export default BuyForm;














