import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import donateNodes from '../Images/donateNodes.png';
import angelImage from '../Images/angel.png';
import devilImage from '../Images/devil.png';

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
		await this.props.withdrawFromCharity();
		this.props.reloadBCData();
	}

	callHack = async () => {
		await this.props.initiateAttackFunction();
		this.props.reloadBCData();
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
	            <button onClick={() => this.callWithdrawal('top-left')} className="withdrawal-button">Withdrawal</button>
	          </div>

	         	{/* BOTTOM LEFT RECTANGLE */}
	          <div className="rectangle bottom-left">
	          	<div className="devil-container">
    						<img src={devilImage} alt="Devil" className="devil-image" />
  						</div>
	          	<div className="hack-text">Attempt to hack the charity pool!</div>
	            <button onClick={() => this.callHack('bottom-left')} className="hack-button">HACK!</button>
	          </div>


 						{/* IMAGE ON THE RIGHT */}
	          <div className="image-container">
	          	<img src={donateNodes} alt="donateNodes" />
	       
	         		<div className="text-overlay">
								  <p>You Contributed ETH: {this.state.contributionAmount}</p>
								  <p>Charity Balance: {this.props.charityBalance}</p>
								  <p>Contract Balance of CandW: {this.props.cANDwBalance}</p>
								  <p>Contract Balance of Hacker Contract: {this.props.reentrancyAttackBalance}</p>

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








// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// class Charity extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showPopup: true,
//       contributionAmount: '',
//       successMessage: false,
//     };
//   }

//   handleContributionSubmit = () => {
//     const { contributionAmount } = this.state;
//     const parsedAmount = parseFloat(contributionAmount);

//     if (!isNaN(parsedAmount) && parsedAmount > 0) {
//       // Perform actions with the contribution amount
//       // Example: Send the contribution to the server

//       // Hide the pop-up window and show success message
//       this.setState({ showPopup: false, successMessage: true });
//     } else {
//       // Show error message for invalid contribution amount
//       alert('Please enter a valid contribution amount.');
//     }
//   };

//   render() {
//     const { showPopup, contributionAmount, successMessage } = this.state;

//     return (
//       <div>
//         {showPopup && (
//           <div className="popup">
//             <h2>Make contribution in Ether</h2>
//             <input
//               type="text"
//               value={contributionAmount}
//               onChange={(e) => this.setState({ contributionAmount: e.target.value })}
//             />
//             <button onClick={this.handleContributionSubmit}>Submit</button>
//           </div>
//         )}

//         {!showPopup && successMessage && (
//           <div className="success-message">
//             <p>Your contribution was submitted successfully!</p>
//           </div>
//         )}

//         <div className="back-button-container">
//           <Link to="/" className="back-button" onClick={this.props.backToMain}>
//             Back to Main App
//           </Link>
//         </div>

//         {/* Additional content */}
//         {!showPopup && !successMessage && (
//           <div className="content-container">
//             {/* Input Box */}
//             <div className="input-group">
//               {this.state.currentToken === 'SELECT' ? (
//                 <input
//                   type="text"
//                   className="form-control form-control-lg"
//                   placeholder="Select a Token to Lend!"
//                   disabled
//                 />
//               ) : (
//                 <input
//                   type="text"
//                   ref={(input) => {
//                     this.input = input;
//                   }}
//                   value={this.state.loanAmount}
//                   onChange={(event) => {
//                     this.setState({ loanAmount: event.target.value });
//                   }}
//                   style={{
//                     backgroundColor: 'yellow',
//                     color: 'black',
//                     padding: '5px',
//                     borderRadius: '5px',
//                     width: '250px',
//                   }}
//                 />
//               )}

//               {/* Token Dropdown */}
//               <div className="input-group-append">
//                 <div className="btn-group">
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary dropdown-toggle"
//                     data-toggle="dropdown"
//                     aria-haspopup="true"
//                     aria-expanded="false"
//                     style={{ backgroundColor: 'yellow' }}
//                   >
//                     <img
//                       src={this.state.tokenInfo[this.state.currentToken].logo}
//                       height="32"
//                       alt="Token Logo"
//                     />{' '}
//                     &nbsp;
//                     <span style={{ color: 'black' }}>{this.state.currentToken}</span>
//                   </button>
//                   <div className="dropdown-menu token-scrollable-menu">
//                     {tokenList.slice(1).map((token) => (
//                       <a
//                         key={token}
//                         className="dropdown-item"
//                         href="#"
//                         onClick={() => {
//                           this.setState({ currentToken: token });
//                         }}
//                       >
//                         <img
//                           src={this.state.tokenInfo[token].logo}
//                           height="40"
//                           alt={`${token} Logo`}
//                         />
//                         &nbsp; {token}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div style={{ marginTop: '10px' }}>
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-block btn-lg"
//                 onClick={this.handleFlashLoan}
//               >
//                 SEND FLASH LOAN!
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default Charity;
