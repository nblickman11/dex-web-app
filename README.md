# dex-web-app
-React-based DApp that interacts with MetaMask wallets.  
-Buy and sell Ethereum for 13 different ERC-20 tokens ("Nelson tokens") via a user-friendly interface.
-Created oracle contracts to simulate a real oracle.  Pulling in, currently fake, weather data.
-Includes Solidity smart contracts for tokens, exchange, and oracle, on the backend.

# STEPS TO LAUNCH APP
1. Download or clone project to local location.
2. At the project root run "npm install" to download the node_modules directory.
3. Launch Ganache.  Adjust the truffle-config.js file to match the Ganache network.
4. Launch your browser and connect one of Ganache's account's to your MetaMask wallet.
5. The smart contracts are already compiled, but you can still run "truffle compile".
6. Run "truffle migrate" to deploy the smart contracts to the simulated Ganache Blockchain.
7. Run "npm run start" to launch the React Application.


