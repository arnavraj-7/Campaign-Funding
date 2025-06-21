require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
        localhost2: {
      url: "http://127.0.0.1:8546",
    },

    Holesky: {
      url: "https://rpc.ankr.com/eth_holesky/5ae64678cd8723fa659a9b1e96628188e66d4c5c2eb28b97bde6e1befb42012d",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
