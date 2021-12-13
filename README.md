### Preparation

#### Project

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
~~~

#### Required softwares

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

#### Environment variables

To use this project, you have to provide BIP32 mnemonic and Infura project ID as environment variables.

| Environment Variable | Description | Local Ganache | Ethereum Testnets | Remarks |
| -------------------- | ----------- | ------------- | ----------------- | ------- |
| `BIP39_MNEMONIC`  | BIP39 mnemonic to generate test accounts | O | O |  | 
| `INFURA_PROJECT_ID` | Infura project ID to access Ethereum testnets like Rinkeby, Kovan, Ropsten or so on | X | O |  |

* `BIP39_MNEMOIC` is required for all networks defined in Truffle configuration. (`truffle-config.js`)
* `INFURA_PROJECT_ID` is required only for Ethereum testnets (Rinkeby, Kovan, Ropsten ...).
* If you need Infura project ID but don't have yours, sign up for [Infura](https://infura.io/) and follow the next article.
    * [Getting Started With Infura](https://blog.infura.io/getting-started-with-infura-28e41844cc89/)

----

### Using Ganache CLI

----

### Using Truffle

To list configured networks, read `truffle-config.js` or execute `truffle networks` command.

~~~bash

$ truffle networks

~~~

----

### Using Remix


----

### Code Style

Contract sources are recommanded to follow "OpenZeppelin Contracts Design Guidelines" extending official Solidity style guides. 

* [OpenZeppelin Contracts Design Guidelines](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/GUIDELINES.md)
* [Solidity Style Guide](https://docs.soliditylang.org/en/v0.8.10/style-guide.html)

----

### References

----
