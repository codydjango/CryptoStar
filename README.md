# CryptoStar Registry

This is the final project for the Udacity Blockchain Nanodegree. This project is a simple Ethereum Dapp that makes use of the ERC-721 standard (implemented using the OpenZepplin boilerplate) to allow for the claiming and trading of Stars.

### Submission Details

* ERC-721 Token name: ZETA
* ERC-721 Token symbol: ζ
* ERC-721 Token address: (Rinkleby)

### Versions

* Truffle v5.0.0 (core: 5.0.0)
* Solidity v0.5.0 (solc-js)
* Node v11.6.0
* Truffle HD Wallet Provider ^1.0.2
* OpenZepplin: ^2.1.2

### Development

`npm install`

`truffle develop compile && truffle develop migrate --reset` to startup local test chain

`cd src && npm run dev` to run webpack devserver