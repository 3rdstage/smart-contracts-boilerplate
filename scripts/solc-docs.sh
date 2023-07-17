#! /bin/bash

# generate developer/user documentation in JSON from the Natspec comments in sources

readonly verbose=1  # 1: true, 0: false - Hard coded yet
readonly uname=`uname -s`  # OS type
readonly base_dir=$(cd `dirname $0` && cd .. && pwd)

cd ${base_dir}

solc --userdoc --devdoc \
     --base-path=contracts/ --include-path=node_modules/ \
     -o docs/solc --pretty-json \
     contracts/IRegularSecurity.sol