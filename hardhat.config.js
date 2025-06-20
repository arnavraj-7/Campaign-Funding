require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    amoy: {
      url: "https://misty-skilled-butterfly.matic-amoy.quiknode.pro/f355585c6b4701296eeb608908d1f9356cdbe61c/",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
