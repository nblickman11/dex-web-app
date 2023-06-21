// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

pragma experimental ABIEncoderV2;

import './OracleContract.sol';
import './MockLinkToken.sol';

// NOTE we're not using the real chainlink decentralized network,
// but mocking it's functionality.

contract OracleClient {

    // State variables are stored in "storage", which are persistent
    // .. across function calls and even after contract destruction.
    uint256[] public volume;
    string private jobId;
    uint256 private fee;

    // Instance of the mock LinkToken contract
    MockLinkToken public mockLinkToken;
    OracleContract public oracleContract;
    address public ocAddress;

    struct Request {
        string id;
        string apiCall;
        string path;
        uint256 timesAmount;
    }

    Request public myRequest;

    event RequestVolume(bytes32 indexed requestId, uint256[] volume);
    event ClientTest(string apple);

    constructor(address oracleContractAddress, address mockLinkTokenAddress) public 
    {
        mockLinkToken = MockLinkToken(mockLinkTokenAddress);
        oracleContract = OracleContract(oracleContractAddress);
        ocAddress = oracleContractAddress;
        jobId = "0";
        fee = 1; // 0,1 * 10**18 (Varies by network and job)
    }

    function getData() public view returns (uint256[] memory) {
        return volume;
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestOracleData() public {

        myRequest.id = jobId;
        myRequest.apiCall = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD";
        myRequest.path = "RAW.ETH.USD.VOLUME24HOUR";
        myRequest.timesAmount = 10 ** 18;

        //emit ClientTest("call Mock Link contract");

        // SIMULATED NETWORK, follow this function
        mockLinkToken.transferFromOracleClient(fee, myRequest, ocAddress);
    }

    function fulfill(bytes32 _requestId, uint256[] memory _volume) public {
        volume = _volume;
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    // function withdrawLink() public onlyOwner {
    //     LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    //     require(
    //         link.transfer(msg.sender, link.balanceOf(address(this))),
    //         "Unable to transfer"
    //     );
    // }
}
