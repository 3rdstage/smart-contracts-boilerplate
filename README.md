## Preparation

### Project

To use this boilerplate, first clone this repository into your own new repository.

~~~bash

$ git clone https://github.com/3rdstage/smart-contracts-boilerplate.git my-smart-contracts

~~~

Remove current `origin` remote from the local repository, and add a new one if necessary

~~~bash

$ git remote -v  // check current remotes
...
$ git remote rm origin  // remove 'origin' remote
$ git remote -v

~~~

Update the project name in `.project` file, if you are to use Eclipse with this project.

~~~bash
$ cd my-smart-contracts
$ vi .project
...
~~~

### Environment Variables

To use this project, you may need to provide BIP39 mnemonic and Infura project ID as environment variables.

| Environment Variable | Description | Usage |
| -------------------- | ----------- | ----- |
| `BIP39_MNEMONIC`     | [BIP39 mnemonic](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) to generate test accounts | Local Ganache, Truffle with Ethereum testnets |
| `INFURA_PROJECT_ID`  | [Infura](https://infura.io/) project ID to access Ethereum testnets like Rinkeby, Kovan, Ropsten or so on |   |


* `BIP39_MNEMONIC`
    * Required for local Ganache (`scripts/ganacle-cli-start.sh`) and most of networks defined in Truffle configuration (`truffle-config.js`).
    * To generate a new one, refer https://iancoleman.io/bip39/
* `INFURA_PROJECT_ID`
    * Required only for Ethereum testnets (Rinkeyby, Kovan, Ropsten) via Truffle
    * If you don't have any one, sign up for [Infura](https://infura.io/) and refer the following.
        * [Getting Started With Infura](https://blog.infura.io/getting-started-with-infura-28e41844cc89/)

### Required softwares

Install `Truffle`, `Ganache CLI` and `remixd` into ***global scope*** if not installed yet.

~~~bash
# check whether 'Truffle' is installed or not
$ npm ls -g --depth 0 | grep truffle

# check latest version of 'Truffle'
$ npm view truffle version

# install 'Truffle' if not installed yet or installed one is too old
$ npm install -g truffle

# check whether 'Ganache CLI' is intalled or not
$ npm ls -g --depth 0 | grep ganache-cli

# check latest version of 'Ganache CLI'
$ npm view ganache-cli version

# install 'Ganache CLI' if not installed yet or installed one is too old
$ npm install -g ganache-cli

# check whether 'remixd' is intalled or not
$ npm ls -g --depth 0 | grep remixd

# check latest version of 'remixd'
$ npm view @remix-project/remixd version

# install 'remixd' if not installed yet or installed one is too old
$ npm install -g @remix-project/remixd
~~~

After global scope packages, local scope packages are need to be installed.
At the base directory of the project, run `npm`.
This will install packages defined in `package.json`.

~~~bash

$ npm

~~~

----

## Using Ganache CLI

Ganache CLI is one of the most mandatory tool to test your smart contracts quickly.
The boilerplate project contains a script to start Ganach CLI in more better way.

To start Ganache CLI, run `scipts/ganache-cli-start.sh` from the project directory
It will print out some properties and full command line starting with `ganche-cli --networks...`

If you are using Microsoft Windows, Git Bash included in [Git for Windows](https://git-scm.com/download/win) is recommanded to run shell script.

~~~bash

$ scripts/ganache-cli-start.sh
Chain ID: 31
Host Address: 127.0.0.1
TCP Port: 8545
Gas Price: 2.5E10
Gas Limit: 4E8
Current system is 'macOS'
'BIP39_MNEMONIC' env. variable is defined, so it will be used.

ganache-cli --networkId 31 --chainId 31 --host '127.0.0.1' --port 8545 ...
~~~

Without any argument, the script will launch Ganache CLI in foreground.
To stop the Ganache CLI, type `Ctrl` + `C`.

The script will create and unlock 10 test accounts from the specified mnemonic (via `BIP39_MNEMONIC` environment variable).
The accounts would not change if the mnemonic is not changed.
You can print out key-pairs and addresses for the test accounts using `script/print-test-keyparis.js` file.
The following command line would show key-pairs and addresses in JSON format.

~~~bash

$ node scripts/print-test-keyparis.jsnode

~~~

Initally, test accounts are given 10,000 ETH

Data files and log file of the Ganache CLI are located under `run/ganache` directory.
Directories would be created when `scripts/ganache-cli-start.sh` is run for the first time.

| Contents | Location | Remarks |
| -------- | -------- | ------- |
| Ganache CLI Data | `run/ganache/data/` |   |
| Ganache CLI Log  | `run/ganache/ganache.log` |   |


Runing `scripts/ganache-cli-start.sh` without any argument will reuse data in previous run.
So account balances and smart contracts in previous run will be remain.
If you want to launch Ganache CLI from the genesis, run `scripts/ganache-cli-start.sh` with `-r` or `--refresh` option.
This option will remove all the data under `run/ganache/data/` directory.

~~~bash

$ scripts/ganache-cli-start.sh -r

~~~


----

## Using Truffle

To list configured networks, read `truffle-config.js` or execute `truffle networks` command.

~~~bash

$ truffle networks

~~~

To walk around with local Ganache CLI, get into the Truffle console after launching Ganache CLI.

~~~bash

$ truffle console
...
truffle(development)>

~~~

The following sample snippet will help you understand the `development` network connected to local Ganache CLI

~~~javascript

truffle(development)> web3.eth.getNodeInfo()
'EthereumJS TestRPC/v2.13.1/ethereum-js'
truffle(development)> web3.eth.getProtocolVersion()
'63'
truffle(development)> web3.eth.getAccounts()
[ '0xb009cd53957c0D991CAbE184e884258a1D7b77D9',
  '0x05f9301Be8F3C133fC474F8d538fD732CaCa274c',
  '0x3DC9b4063a130535913137E40Bed546Ff93b1131',
  '0x770b1A8d293d152B8Cc9fC01531B1baB3469AF05',
  '0xAB3ca295454D4A4de79aE32474d2C82f2D0836b1',
  '0x876e0cab3dfC5d2EA19f9A9e6029E8C1b90452Ed',
  '0xBb9Bb87EfE2Cf5E024f32c5943311FdA471848Ca',
  '0x950ea7798112705f487F657E93Fe5D64557CD138',
  '0xA797051B95915F31464440A590332e3360bfEDb9',
  '0x9Ebe0ec1f5f2c0f6BA7d9f7187d6f5c540F2b5fa' ]
truffle(development)>  Promise.all(accounts.map(acct => web3.eth.getBalance(acct).then(balance => [acct,balance])))
[ [ '0xb009cd53957c0D991CAbE184e884258a1D7b77D9',
    '10000000000000000000000' ],
  [ '0x05f9301Be8F3C133fC474F8d538fD732CaCa274c',
    '10000000000000000000000' ],
  [ '0x3DC9b4063a130535913137E40Bed546Ff93b1131',
    '10000000000000000000000' ],
  [ '0x770b1A8d293d152B8Cc9fC01531B1baB3469AF05',
    '10000000000000000000000' ],
  [ '0xAB3ca295454D4A4de79aE32474d2C82f2D0836b1',
    '10000000000000000000000' ],
  [ '0x876e0cab3dfC5d2EA19f9A9e6029E8C1b90452Ed',
    '10000000000000000000000' ],
  [ '0xBb9Bb87EfE2Cf5E024f32c5943311FdA471848Ca',
    '10000000000000000000000' ],
  [ '0x950ea7798112705f487F657E93Fe5D64557CD138',
    '10000000000000000000000' ],
  [ '0xA797051B95915F31464440A590332e3360bfEDb9',
    '10000000000000000000000' ],
  [ '0x9Ebe0ec1f5f2c0f6BA7d9f7187d6f5c540F2b5fa',
    '10000000000000000000000' ] ]
truffle(development)> web3.eth.getBlock('latest')

~~~

To escape from Truffle console, execute `.exit`

~~~javascript

truffle(development)> .exit
...
$

~~~


----

## Using Remix


----

## Code Style

Contract sources are recommanded to follow "OpenZeppelin Contracts Design Guidelines" extending official Solidity style guides.

* [OpenZeppelin Contracts Design Guidelines](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/GUIDELINES.md)
* [Solidity Style Guide](https://docs.soliditylang.org/en/v0.8.10/style-guide.html)

----

## References

| Category | Reference | Remarks |
| -------- | --------- | ------- |
| Solidity | [Solidity documentation (latest)](https://docs.soliditylang.org/en/latest/) |   |
|          | [OpenZeppelin Contracts v3.x documentation](https://docs.openzeppelin.com/contracts/3.x/) |   |
|          | [OpenZeppelin Contracts v4.x documentation](https://docs.openzeppelin.com/contracts/4.x/) |   |
| Web3     | [Web3.js v1.5.2 documentation](https://web3js.readthedocs.io/en/v1.5.2/) |   |

----
