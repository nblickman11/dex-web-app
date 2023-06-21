// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

// Don't use this in live deployments
pragma experimental ABIEncoderV2;

// import "./v0.8/ChainlinkClient.sol";
import './OracleClient.sol';


contract OracleContract {

    // Event emitted when a request is made
    event OracleRequest(
        bytes32 indexed requestId,
        string apiEndpoint,
        string path
    );

    // Event emitted when a request is fulfilled
    event OracleResponse(
        bytes32 indexed requestId,
        uint256 result
    );

    // Store the API endpoint and path for the request
    struct OracleData {
        string apiEndpoint;
        string path;
    }

    // Mapping of request IDs to OracleData
    mapping(bytes32 => OracleData) private oracleDataMap;

    // Mock response data
    mapping(bytes32 => uint256) private mockResponseData;

 
    function onTokenTransfer(
        address _sender,
        uint256 _amount,
        OracleClient.Request calldata _data
    ) external {

        // Get the request ID from the data
        bytes32 requestId = stringToBytes32(_data.id);

        // Get the request details
        string memory apiCall = _data.apiCall;
        string memory path = _data.path;
        uint256 timesAmount = _data.timesAmount;

        // Instead of calling a real Oracle API, do getMockResponse()        
        fulfillOracleRequest(requestId, getMockResponse(), _sender);
    }

    // Helper function to convert string to bytes32 uses assembly language below.
    // Purpose: can now compare this string to other 32byte values.
    // Also is good for hashing. So a "Hello" is turned into a 0x48656c6c6f hexa decimal value
    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        assembly {
            result := mload(add(source, 32))
        }
    }

    // Array's must sepcify their data location.
    function getMockResponse() internal pure returns (uint256[] memory) {
        
        // Generate a mock response data
        uint256[] memory myArray;
        myArray = new uint256[](13);
        myArray[0] = 67;
        myArray[1] = 77;
        myArray[2] = 57;
        myArray[3] = 47;
        myArray[4] = 37;
        myArray[5] = 62;
        myArray[6] = 61;
        myArray[7] = 63;
        myArray[8] = 65;
        myArray[9] = 66;
        myArray[10] = 68;
        myArray[11] = 69;
        myArray[12] = 61;      

        return myArray;
    }

    // Fulfill the request and send the response back to OracleClient
    function fulfillOracleRequest(
        bytes32 _requestId,
        uint256[] memory _result,
        address _receiver_address
    ) internal {
        // Forward the response to the corresponding client contract
        OracleClient(_receiver_address).fulfill(_requestId, _result);
    }
}
