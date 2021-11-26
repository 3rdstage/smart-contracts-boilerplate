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

~~~
# address : 0xb009cd53957c0D991CAbE184e884258a1D7b77D9
ethereum.keys.0=0x052fdb8f5af8f2e4ef5c935bcacf1338ad0d8abe30f45f0137943ac72f1bba1e
# address : 0x05f9301Be8F3C133fC474F8d538fD732CaCa274c
ethereum.keys.1=0x6006fc64218112913e638a2aec5bd25199178cfaf9335a83b75c0e264e7d9cee
# address : 0x3DC9b4063a130535913137E40Bed546Ff93b1131
ethereum.keys.2=0x724443258d598ee09e79bdbdc4af0792a69bd80082f68180157208aa6c5437de
# address : 0x770b1A8d293d152B8Cc9fC01531B1baB3469AF05
ethereum.keys.3=0x00f84e1eaf2918511f4690fb396c89928bebfbe5d96cd821069ecf16e921a4ee
# address : 0xAB3ca295454D4A4de79aE32474d2C82f2D0836b1
ethereum.keys.4=0x78394a06447e6688317ee920cefd3b992dee3d9ee9cb2462f22ab730723fab4a
# address : 0x876e0cab3dfC5d2EA19f9A9e6029E8C1b90452Ed
ethereum.keys.5=0x4f7b71565f80821fbad1e4a3c7b8c7a28297d40d5179e4aad5c071c0370a956d
# address : 0xBb9Bb87EfE2Cf5E024f32c5943311FdA471848Ca
ethereum.keys.6=0x3410f72766f9be720638f02a0047b6cb2da3265f393d032caccdb0bd13854a58
# address : 0x950ea7798112705f487F657E93Fe5D64557CD138
ethereum.keys.7=0x964a24a416c75097cfbc3d96ba06dadd8f6c8c7503fa5e95dd738241f4f01c3d
# address : 0xA797051B95915F31464440A590332e3360bfEDb9
ethereum.keys.8=0xa5b0a313105744bc0e45373034bed686b0c95fcb24f02ec70fb126d516561cd0
# address : 0x9Ebe0ec1f5f2c0f6BA7d9f7187d6f5c540F2b5fa
ethereum.keys.9=0xb38ca892d2778a5edfb03141922becca5074497825335bbbcf2780fa114f0cf4
~~~

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

### References

----