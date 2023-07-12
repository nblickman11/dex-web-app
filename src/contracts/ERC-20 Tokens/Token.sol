pragma solidity ^0.5.0;

// ERC-20 is set of rules that all the crypto's abide by.  I.E. Token must have 
// transfer and balanceOf functions.

import '../Parent Contracts/Token_Interface.sol';
import '../Parent Contracts/BaseTokenContract.sol';

contract Token is BaseTokenContract, TokenInterface {
    string  public name = "Nelson Blickman";
    string  public birthPlace = "Manhattan, NY";
    string  public symbol = "NTB";
    uint256 public totalSupply = 2000000000000000000000000;
    uint8 public decimals = 18;
    uint public rate = 100;



    event LogMessageToken(string);


    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // Stores addresses and their amount of Nelson's tokens.
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // On deployment truffle automatically selected the top Ganache account to 
    // be the: Initial Deployer, hence is the msg.sender.
    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function getName() public view returns (string memory) {
        return name;
    }
    function getBirthPlace() public view returns (string memory) {
        return birthPlace;
    }

    function getRate() public view returns (uint) {
        return rate;
    }

    function getSymbol() public view returns (string memory) {
        return symbol;
    }
    
    function deposit(uint256 _value, address _from, address _to) public 
    onlyFlashLoanContract(msg.sender, flashLoanAddress) returns (bool success)
    {
        require(_value <= balanceOf[_from]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        return true;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value); 
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        // Called from App.js. So msg.sender = User Account.
        // Can see param passed in = Eth Swap address.
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        // Confirm account owns enough token's
        require(_value <= balanceOf[_from]);
        // Confirm the nested mapping = UserAccount:EthSwap:value has enough.
        require(_value <= allowance[_from][msg.sender]);

        // Deduct tokens from one account and add to another in the BalanceOf mapping
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        // Reduce account's allowance balance.
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}


