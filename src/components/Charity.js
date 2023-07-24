import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import donateNodes from '../Images/donateNodes.png';
import angelImage from '../Images/angel.png';
import devilImage from '../Images/devil.png';
import devilBlackImage from '../Images/devilBlack.png';
import ioImage from '../Images/ioImage.png';

import './css/Charity.css';

class Charity extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	showPopup: true,
    	contributionAmount: '',
    };
  }

	handleContributionSubmit = async () => {
		const contribution = this.state.contributionAmount
		if (contribution === '0' || contribution === '' || isNaN(contribution))
		{
			alert('Please enter a valid contribution amount.');
			return;
		} 
		//const contributionFloat = parseFloat(contribution);
		let weiContribution = window.web3.utils.toWei(contribution, 'Ether');

		if (weiContribution > parseInt(this.props.ethBalance.toString()))
		{	
			alert('You do not have enough funds.');
			return;
		} 

		await this.props.contributeToCharity(weiContribution);
  	this.props.reloadBCData();

		if (!this.props.contributeRejected) {
    	this.setState({showPopup: false});
    	this.setState({contributionAmount: weiContribution});
    }
	}

	callWithdrawal = async () => {
		let charityBalance = window.web3.utils.fromWei(this.props.charityBalance, 'Ether');
		if (charityBalance < 3) {
			alert('There is not enough to WITHDRAW! Charity Balance < 3 ETH');
		}
		else {
			await this.props.withdrawFromCharity();
			this.props.reloadBCData();
		}
	}

	callHack = async () => {
		let charityBalance = window.web3.utils.fromWei(this.props.charityBalance, 'Ether');
		if (charityBalance < 3) {
			alert('There is not enough to HACK! Charity Balance <= 3 ETH');
		}
		else if (3 <= charityBalance && charityBalance < 6) {
			await this.props.initiateAttackFunction();
			this.props.reloadBCData();
			alert('See smart contracts which show why you could not reenter for more.  Earning 3 ETH is nothing!');
		}
		else {
			await this.props.initiateAttackFunction();
			this.props.reloadBCData();
			alert('Rejected! See smart contracts.  Your reentry was thwarted!');
		}
	}

	callHack2 = async () => {
		let charityBalance = window.web3.utils.fromWei(this.props.charityBalance, 'Ether');
		if (charityBalance < 3) {
			alert('There is not enough to HACK! Charity Balance < 3 ETH');
		}
		else {
			await this.props.initiateAttackFunction2();
			this.props.reloadBCData();
		}
	}

  render() {
	  return (
      <div>
				{/* 
						If the the showPopup is true, use overlay css (creates a transparent
				 		background for better visual affect of the popup.)
				 */}
      	<div className={this.state.showPopup ? 'popup-overlay' : 'without-popup'}>
          <div className="charity-content-container">       

				{/* BACKGROUND CONTENT */}
	         	
	         	{/* TOP LEFT RECTANGLE */}
	          <div className="rectangle top-left">
	            <div className="angel-container">
    						<img src={angelImage} alt="Angel" className="angel-image" />
  						</div>
	          	<div className="withdrawal-text">Kindly withdrawal your fair share.</div>
	            <button onClick={() => this.callWithdrawal('top-left')} className="withdrawal-button">Withdraw</button>
	          	<div className="io-container">
    						<img src={ioImage} alt="ioImage" className="io-image" />
  						</div>
	          </div>

	          {/* CENTER LEFT RECTANGLE */}
	          <div className="rectangle center-left">
	          	<div className="devil-container">
    						<img src={devilImage} alt="Devil" className="devil-image" />
  						</div>
	          	<div className="hack-text">Attempt to hack the charity pool!</div>
	            <button onClick={() => this.callHack('bottom-left')} className="hack-button">HACK!</button>     	
	          	<div className="io-container">
    						<img src={ioImage} alt="ioImage" className="io-image" />
  						</div>
	          </div>

	         	{/* BOTTOM LEFT RECTANGLE */}
	          <div className="rectangle bottom-left">
	          	<div className="devilBlack-container">
    						<img src={devilBlackImage} alt="Devil Black" className="devilBlack-image" />
  						</div>
	          	<div className="hack-text2">Successfully hack the charity pool!</div>
	            <button onClick={() => this.callHack2('bottom-left')} className="hack-button2">HACK 2!</button>
	          	<div className="io-container">
    						<img src={ioImage} alt="ioImage" className="io-image" />
  						</div>
	          </div>


 						{/* IMAGE ON THE RIGHT */}
	          <div className="image-container">
	          	<img src={donateNodes} alt="donateNodes" />
	       
	         		<div className="text-overlay">
								  
								  <p className="eth-bal">Your ETH Balance: {parseFloat(window.web3.utils.fromWei(this.props.ethBalance, 'Ether')).toFixed(2)}</p>

								  <p className="heading-amount">Contributed ETH:</p>
								  <div className="mini-box">
										<p className="content-amount">{parseFloat(window.web3.utils.fromWei(this.state.contributionAmount, 'Ether')).toFixed(2)}</p>
          				</div>

          				<p className="heading-amount">Charity Contract Balance:</p>
								  <div className="mini-box">
										<p className="content-amount">{parseFloat(window.web3.utils.fromWei(this.props.charityBalance, 'Ether')).toFixed(2)}</p>
          				</div>

          				<p className="heading-amount">Contributions Contract Balance:</p>
								  <div className="mini-box">
										<p className="content-amount">{parseFloat(window.web3.utils.fromWei(this.props.cANDwBalance, 'Ether')).toFixed(2)}</p>
          				</div>

          				<p className="heading-amount">Hacker Contract Balance:</p>
								  <div className="mini-box">
										<p className="content-amount">{parseFloat(window.web3.utils.fromWei(this.props.reentrancyAttackBalance, 'Ether')).toFixed(2)}</p>
          				</div>


							</div>
	          </div>
				{/* END OF BACKGROUND CONTENT */}      

          </div>
        </div>


				{/* THE POP UP WINDOW */}
        {this.state.showPopup && (
          <div className="popup">
          	<div className="popup-content">
	            <h2>Contribute Ether to in order to continue...</h2>
	            <input
	              type="text"
	              value={this.state.contributionAmount}
	              onChange={(e) => this.setState({contributionAmount: e.target.value})}
	            />
							<button onClick={() => this.handleContributionSubmit(this.state.contributionAmount)}>Submit</button>
	          </div>
	        </div>
        )}

				{/* BACK TO MAIN APP LINK */}
	      <div>
	        <Link to="/" className="back-button" onClick={this.props.backToMain}>
	          Back to Main App
	        </Link>
	      </div>

      </div>

    );
	}
}
export default Charity;
