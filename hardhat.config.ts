// cspell:ignore nomiclabs
// cspell:word

// https://hardhat.org/hardhat-runner/docs/config
// https://hardhat.org/hardhat-runner/docs/guides/typescript

import {HardhatUserConfig} from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

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

    defaultNetwork: "hardhat",

    // https://hardhat.org/hardhat-network/docs/reference
    hardhat: {
      gas : 'auto',
      gasPrice : 'auto',
      gasMultiplier: 1.2,
      accounts: {
        mnemonic: mnemonic,
        count: 12,
        accountsBalance: "10000000000000000000000"
      },
      blockGasLimit: 30_000_000,
      hardfork: "merge",
      throwOnCallFailures: true,
      allowUnlimitedContractSize: false
    },

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