pragma solidity ^0.5.0;

import '../Token_Interface.sol';

contract NRM_Token is TokenInterface {
    string  public name = "Nelson Mandela";
    string  public birthPlace = "Mvezo, South Africa";
    string  public symbol = "NRM";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;
    uint public rate = 3;


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

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

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



    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value); 
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Send tokens to another account to get ETH back.
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        // Confirm account owns enough token's (located in the mapping)
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


