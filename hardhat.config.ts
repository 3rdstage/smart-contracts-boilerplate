// cspell:ignore nomiclabs sepolia

require("@nomiclabs/hardhat-ethers");

const fs = require('fs');
const ganache = {};
ganache.config = fs.readFileSync('scripts/ganache.properties').toString();
ganache.chain = ganache.config.match(/ethereum.chainId=[0-9]*/g)[0].substring(17);
ganache.host = ganache.config.match(/ethereum.host=.*/g)[0].substring(14);
ganache.port = ganache.config.match(/ethereum.port=[0-9]*/g)[0].substring(14);
const mnemonic = process.env.BIP39_MNEMONIC;

// https://hardhat.org/hardhat-runner/docs/config
const config: HardhatUserConfig = {

  paths: {
    artifacts : "./build/hardhat",
    tests: "./test/hardhat",
    cache: "./temp/hardhat/cache"
  },

  // https://hardhat.org/hardhat-runner/docs/config#networks-configuration
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/",
      accounts: []
    },
    ganache: {
      url: `http://${ganache.host}:${ganache.port}`,
      //chainId: 3131,  // optional
      accounts: {
        mnemonic: mnemonic,
        count: 10,
      }
    }
  },

  // https://www.npmjs.com/package/solc?activeTab=versions
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.7.6"
      },
      {
        version: "0.6.12"
      }
    ],
  },

  mocha: {
    timeout: 40000
  }


};

export default config;