# Video Presentation
https://vimeo.com/manage/videos/885422995

# dex-web-app
-React-based DApp that interacts with MetaMask wallets.  
-Buy and sell Ethereum for 13 different ERC-20 tokens ("Nelson tokens") via a user-friendly interface.  
-Created oracle contracts to simulate a real oracle.  Pulling in, currently fake, weather data.  
-Includes functionality that allows users to submit a flash loan that earns interest.  
-Includes Solidity smart contracts for tokens, exchange, oracle, and a charity pool on the backend.  
-Launched to Sepolia Testnet.

# STEPS TO LAUNCH APP
1. Download or clone project to local location.
2. At the project root run "npm install" to download the node_modules directory.
3. Launch Ganache.  Adjust the truffle-config.js file to match the Ganache network.
4. Launch your browser and connect one of Ganache's account's to your MetaMask wallet.
5. The smart contracts are already compiled, but you can still run "truffle compile".
6. Run "truffle migrate" to deploy the smart contracts to the simulated Ganache Blockchain.
7. Run "npm run start" to launch the React Application.
8. (If you'd like to run the test cases, go back to the terminal and run "truffle test".)

