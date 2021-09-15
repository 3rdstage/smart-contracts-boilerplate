Preparation
====

To use this boilerplate, first clone this repository into your own new repository.

````bash
$ git clone https://github.com/3rdstage/smart-contracts-boilerplate.git my-smart-contracts
````

Remove current `origin` remote from the local repository, and add a new one if necessary

```bash
$ git remote -v  // check current remotes
...
$ git remote rm origin  // remove 'origin' remote
$ git remote -v 
````

Update the project name in `.project` file, if you are to use Eclipse with this project.

````bash
$ cd my-smart-contracts
$ vi .project
````

Install `Truffle`, `Ganache CLI` and `remixd` into global scope if not installed yet.

```bash
$ npm ls -g --depth 0  // check currently installed global modules

$ npm view truffle version  // check latest version of 'truffle'

$ npm view ganache version  // check latest version of 'ganache' 

$ npm view @remix-project/remixd version  // check latest version of 'remixd'

Using Ganache CLI
====



Using Truffle
====



To list configured networks, read `truffle-config.js` or execute `truffle networks` command.

````bash

$ truffle networks

````

Using Remix
====



References
====

