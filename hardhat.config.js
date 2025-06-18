require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};