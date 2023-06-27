import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import flashLogo from '../Images/flashLogo.png';
import flashHimselfLogo from '../Images/flashHimself.png';
import './css/FlashLoanMain.css';

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


class FlashLoanMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentToken: 'SELECT',
      output: '0',
      loanAmount: '0',
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

  render() {

  	  const tokenList = Object.keys(this.state.tokenInfo);

	  return (

		  <form
	        className="mb-3"
	        onSubmit={(event) => {
	          event.preventDefault();
	          if (this.state.currentToken == "SELECT") {
            	alert('First select which token you want to lend!');
            	return; // Exit the function here
          	} 
	            let loanAmount = this.input.value.toString();
	            if (loanAmount === '0' || loanAmount === '' || isNaN(loanAmount)){
	            	window.alert("Your amount is empty or invalid!");
	            	return; // Exit the function here
	            }

							let tokenAmount = window.web3.utils.toWei(loanAmount, 'Ether');
					
	            if (parseInt(tokenAmount) > parseInt(this.props.tokenBalanceMapping[this.state.currentToken].toString())){
	            		window.alert("You don't have that many tokens to loan!");
	          	}
	          	else {
	            	this.props.executeFlashLoan(tokenAmount, this.state.currentToken);
	            	this.props.reloadBCData();
	            	this.setState({loanAmount: ''});
	            }
	         }}
	      >

	    <div>

	      <div className="back-button-container">
	        <Link to="/" className="back-button" onClick={this.props.backToMain}>
	          Back to Main App
	        </Link>
	      </div>
	      <div className="logo-container">
	        <img src={flashLogo} alt="Flash Logo" className="flash-logo" />
	      </div>
		

			{/* RED BOX CONTAINER */}
			<div className="flashloan-container" style={{ backgroundColor: 'red', border: '3px solid black', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			  <div style={{ marginTop: '20px' }}>
			    <span style={{ color: 'yellow', fontSize: 'x-large', fontWeight: 'bold', textDecoration: 'underline' }}>
			      Earn Interest Now! 
			    </span>
			  </div>

			  <div style={{ marginTop: '50px' }}>
			    {/* Input label and balance */}
			    <label style={{ fontWeight: 'bold', marginRight: '120px'}}>
			      <b>Loan Amount:&nbsp;&nbsp;&nbsp;&nbsp;</b>
			    </label>

					<span style={{ fontWeight: 'bold'}} className="float-right text-muted black-text">
					  Balance: {parseFloat(window.web3.utils.fromWei(this.props.tokenBalanceMapping[
					    this.state.currentToken].toString(), 'Ether')).toFixed(2)}
					</span>
			  </div>

			  <div style={{ marginTop: '10px' }}>
			  	<div className="input-group">
	  				

					 {this.state.currentToken === 'SELECT' ? (
					            <input
					              type="text"
					              className="form-control form-control-lg"
					              placeholder="Select a Token to Lend!"
					              disabled
					            />
					          ) : (
					  				<input 
					  					type="text" 
					  					ref={(input) => {
				              			this.input = input;
				            			}}
				            	value = {this.state.loanAmount}
				            	onChange={(event) => {
      									this.setState({loanAmount: event.target.value});
    									}}
					  					style={{ backgroundColor: 'yellow', color: 'black', padding: '5px', borderRadius: '5px', width: '250px' }} 
					  					/>)}
	
					 		<div className="input-group-append">  
			            {/* TOKEN DROPDOWN */}
			            <div className="btn-group">		
			              <button
			                type="button"
			                className="btn btn-outline-secondary dropdown-toggle"
			                data-toggle="dropdown"
			                aria-haspopup="true"
			                aria-expanded="false"
			                style={{ backgroundColor: 'yellow' }}>

			                <img src={this.state.tokenInfo[this.state.currentToken].logo} height="32" alt="Token Logo" />
			                &nbsp; <span style={{ color: 'black' }}>{this.state.currentToken}</span>
			            
			              </button>
			              
			              <div className="dropdown-menu token-scrollable-menu">
			                {tokenList.slice(1).map((token) => (
			                  <a
			                    key={token}
			                    className="dropdown-item"
			                    href="#"
			                    onClick={() => {
			                     this.setState({ currentToken: token });
			                   }}
			                  >
			                    <img src={this.state.tokenInfo[token].logo} height="40" alt={`${token} Logo`} />
			                    &nbsp; {token}
			                  </a>
			                ))}
			             </div>
			            </div> {/* this div ends the button group*/}
			        </div>

		        </div>
			  </div>

			  <div style={{marginTop: 'auto', marginBottom: '20px'}}>
			    <button type="submit" className="btn btn-primary btn-block btn-lg">
			      SEND FLASH LOAN!
			    </button>
			  </div>
			</div>
	    </div>

      <div className="logos-container">
        <img src={flashHimselfLogo} alt="Flash" className="flash-himself" />
      </div>


      </form>



    	);
	}
}
export default FlashLoanMain;


