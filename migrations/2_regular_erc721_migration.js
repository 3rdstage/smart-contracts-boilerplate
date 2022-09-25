const Contract = artifacts.require("RegularERC721");


module.exports = async function (deployer, network, accounts) {
  'use strict';
 
  console.debug(`Starting to deploy ${Contract.contractName} contracts`);
  const startAt = Date.now();
  const admin = accounts[1];
  const options = {from: admin, overwrite: true};
  
  const chainId = await web3.eth.getChainId();
  if(chainId === 1){
    console.error("Can't deploy into mainnet.'");
    process.exit(101);
  }
  
  await deployer.deploy(Contract, 'Deep Sky Objects', 'DSO', options);
  const contr = await Contract.deployed();
  
  const logs = [
    {key: 'Target chain', value: `${chainId} (${network})`},
    {key: 'Contract', value: Contract.contractName},
    {key: 'Contract instance', value: contr.address},
    {key: 'Deployment tx', value: contr.transactionHash},
    {key: 'Deployer', value: admin},
    {key: 'Deployed at', value: new Date().toISOString()},
    {key: 'Deployment time duration (ms)', value: (Date.now() - startAt)},
    {key: 'Compiler Version', value: Contract.compiler.version},
  ];
  
  let maxes = logs.map(e => [e.key.length, e.value.length]).reduce((prev, curr) => [Math.max(prev[0], curr[0]), Math.max(prev[1], curr[1])]);
  for(const e of logs){ e.key = e.key.padEnd(maxes[0], ' '); }
  for(const e of logs){ e.value = e.value.padEnd(maxes[1], ' '); }
  
  
  console.table(logs);

};