const Wallet = require('ethereumjs-wallet').default; // https://www.npmjs.com/package/ethereumjs-wallet
const { BN } = require('ethereumjs-util'); // https://www.npmjs.com/package/ethereumjs-util
const bip39 = require("bip39"); // https://www.npmjs.com/package/bip39

// https://github.com/ethereumjs/ethereumjs-wallet#wallet-api
const cnt = (process.argv.length < 3) ? 1 : process.argv[2]; 
const output = {};
output.keyPairs = [];
for(let i = 0, wallet, keyPair; i < cnt; i++){
  wallet = Wallet.generate(false);
  keyPair = {};
  keyPair.privateKey = wallet.getPrivateKeyString();
  keyPair.privateKeyInt = new BN(wallet.getPrivateKey(), 10).toString(10);
  keyPair.publicKey = wallet.getPublicKeyString();
  keyPair.publicKeyInt = new BN(wallet.getPublicKey(), 10).toString(10);
  keyPair.address = wallet.getChecksumAddressString();
  output.keyPairs.push(keyPair);
}
console.log(`Successfully generated ${cnt} addresses`);
console.log(JSON.stringify(output, null, 2));
