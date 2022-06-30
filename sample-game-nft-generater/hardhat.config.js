require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.10",
  networks: {
    mumbai: {
      url: process.env.YOUR_ALCHEMY_MUMBAI_URL,
      accounts: [process.env.YOUR_TEST_WALLET_PRIVATE_KEY],
    }
  }
};