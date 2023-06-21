import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {
  /**
   * Render method of the Navbar component.
   * @return {JSX.Element} The rendered JSX element.
   * this.props.account ? is conditional. If the account's valid,
   * what's in the () will execute.
   */
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark
      flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-auto"
          href="https://www.linkedin.com/in/nelson-blickman-8729a7a8/"
          target="_blank"
          rel="noopener noreferrer"
          style={{fontSize: '14px', color: 'white', marginRight: 'auto'}}
        >
          Nelsons Linkedin
        </a>
        
        <div className="navbar-nav mx-auto d-flex justify-content-center">
          <span className="navbar-text" style={{fontSize: '24px',
            color: 'white', }}>
            Nelsons EthSwap Exchange
          </span>
        </div>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>

            {this.props.account ? (
              <img
                className="ml-2"
                width="30"
                height="30"
                src="AccountPicture.jpg"
                alt=""
              />
            ) : (
              <span></span>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  account: PropTypes.string.isRequired,
};

export default Navbar;
