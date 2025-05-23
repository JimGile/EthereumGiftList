const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // create the merkle tree for the whole nice list
  // and find the proof that norman block is in the list 
  const merkleTree = new MerkleTree(niceList);
  const name = 'Norman Block';
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof,
    name: name,
  });

  console.log({ gift });
}

main();