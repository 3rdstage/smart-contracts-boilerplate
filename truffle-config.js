// https://github.com/trufflesuite/truffle/tree/v5.1.5/packages/hdwallet-provider
// https://web3js.readthedocs.io/en/v1.3.0/web3.html#providers
// https://iancoleman.io/bip39/
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3HttpProvider = require('web3-providers-http');
const Web3WsProvider = require('web3-providers-ws');

// Read properties for local standalone Ganache CLI node
const mnemonic = process.env.BIP39_MNEMONIC;
const fs = require('fs');
const config = fs.readFileSync('scripts/ganache-cli.properties').toString();
const ganache = {
  host : config.match(/ethereum.host=.*/g)[0].substring(14),
  port : config.match(/ethereum.port=[0-9]*/g)[0].substring(14),
  chain : config.match(/ethereum.chainId=[0-9]*/g)[0].substring(17),
  websocket: false
}

// https://www.npmjs.com/package/web3-providers-http
const defaultHttpOptions = {
  keepAlive: true, timeout: 70000
}

// https://www.npmjs.com/package/web3-providers-ws
// https://github.com/theturtle32/WebSocket-Node/blob/v1.0.31/docs/WebSocketClient.md#client-config-options
const defaultWsOptions = {
  timeout: 600000,

  clientConfig: {
    maxReceivedFrameSize: 100000000,
    maxReceivedMessageSize: 100000000,

    keepalive: true,
    keepaliveInterval: 60000,
  },

  reconnect: { auto: true, delay: 5000, maxAttempts: 5, onTimeout: false }
}

module.exports = {

  // https://www.trufflesuite.com/docs/truffle/reference/configuration#networks
  networks: {

    // https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client#truffle-develop
    builtin: {    // truffle built-in client : aka `truffle develop`
      host: '127.0.0.1',
      port: 9545,
      network_id: "*"
    },
    
    development: {
      host: ganache.host,
      port: ganache.port,
      network_id: ganache.chain,
      gas: 3E8,
      gasPrice: 0,
      websockets: ganache.websocket
    },
    
    mainnet: {
      provider: () => new HDWalletProvider(
        mnemonic, "https://mainnet.infura.io/v3/" + process.env.INFURA_PROJECT_ID),
      network_id: '1'
    },

    //Ropsten : PoW
    //GitHub : https://github.com/ethereum/ropsten/
    //Explorer : https://ropsten.etherscan.io/
    //Faucet : https://faucet.ropsten.be/
    ropsten: {
      provider: () => new HDWalletProvider(
        mnemonic, "https://ropsten.infura.io/v3/" + process.env.INFURA_PROJECT_ID),
      network_id: '3',
      gas: 7E6,
      gasPrice: 1E10
    },

    //Rinkeby : PoA
    //Explorer : https://rinkeby.etherscan.io/
    //Faucet : https://faucet.rinkeby.io/
    //Avg. Block Time : 15s
    rinkeby: {
      provider: () => new HDWalletProvider(
        mnemonic, "https://rinkeby.infura.io/v3/" + process.env.INFURA_PROJECT_ID),
      network_id: '4',
    },

    rinkeby_ws: {
      provider: () => {
        // Monkey patch to support `web3.eth.subscribe()` function
        // https://github.com/trufflesuite/truffle/issues/2567
        const wsProvider = new Web3WsProvider(
          "wss://rinkeby.infura.io/ws/v3/" + process.env.INFURA_PROJECT_ID, defaultWsOptions);
        HDWalletProvider.prototype.on = wsProvider.on.bind(wsProvider);
        return new HDWalletProvider({
          mnemonic: mnemonic,
          providerOrUrl: wsProvider,
          pollingInterval: 10000
        });
      },
      network_id: '4', //https://github.com/ethereum/wiki/wiki/JSON-RPC#net_version
      websockets: true, 
    },

    //Kovan : PoA
    //GitHub : https://github.com/kovan-testnet/
    //Explorer : https://kovan.etherscan.io/
    //Faucet : https://github.com/kovan-testnet/faucet
    //Avg. Block Time : 4s
    kovan: {
      provider: () => 
        new HDWalletProvider({
          mnemonic: mnemonic,
          providerOrUrl: new Web3HttpProvider("https://kovan.infura.io/v3/" + process.env.INFURA_PROJECT_ID, defaultWsOptions),
          pollingInterval: 2000
        }),
      network_id: '42', //https://github.com/ethereum/wiki/wiki/JSON-RPC#net_version
      //gas: 7E6,
      //gasPrice: 5E10
    },

    kovan_ws: {
      provider: () => {
        // Monkey patch to support `web3.eth.subscribe()` function
        // https://github.com/trufflesuite/truffle/issues/2567
        const wsProvider = new Web3WsProvider(
          "wss://kovan.infura.io/ws/v3/" + process.env.INFURA_PROJECT_ID, defaultWsOptions);
        HDWalletProvider.prototype.on = wsProvider.on.bind(wsProvider);
        return new HDWalletProvider({
          mnemonic: mnemonic,
          providerOrUrl: wsProvider,
          pollingInterval: 2000
        });
      },
      network_id: '42', //https://github.com/ethereum/wiki/wiki/JSON-RPC#net_version
      websockets: true, 
      //gas: 7E6,
      //gasPrice: 5E10
    },
    
    // Goerli : PoA
    // GitHub : https://github.com/goerli/testnet
    // Explorer : https://goerli.etherscan.io/
    // Faucet : 
    // Avg. Block Time : 15s
    goerli: {
      provider: () => new HDWalletProvider({
        mnemonic: mnemonic,
        providerOrUrl: new Web3HttpProvider(
          "https://goerli.infura.io/v3/" + process.env.INFURA_PROJECT_ID, defaultHttpOptions),
        pollingInterval: 15000
      }),
      network_id: '5'
    }
  },

  // Set default mocha options here, use special reporters etc.
  // https://github.com/mochajs/mocha/blob/v5.2.0/lib/mocha.js#L64
  // https://mochajs.org/#command-line-usage
  mocha: {
    useColors: true,
    enableTimeouts: true,
    timeout: 180000
  },

  // Configure your compilers
  // https://www.trufflesuite.com/docs/truffle/reference/configuration#compiler-configuration
  // https://solidity.readthedocs.io/en/v0.6.6/using-the-compiler.html#target-options
  compilers: {
    solc: {
      version: "pragma",  // https://github.com/trufflesuite/truffle/releases/tag/v5.2.0
      //parser: "solcjs",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "istanbul"  // berlin, istanbul, petersburg, constantinople, byzantium
      }
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
