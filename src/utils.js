const Web3 = require('web3').default;
const fs = require('fs');
const path = require('path');

const web3 = new Web3('http://127.0.0.1:8545');

const contractABI = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../artifacts/contracts/CertificateVerification.sol/CertificateVerification.json'))
).abi;

const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function issueCertificate(account, certificateHash) {
    return await contract.methods.issueCertificate(certificateHash).send({ from: account, gas: 1000000 });
}

async function verifyCertificate(certificateHash) {
    return await contract.methods.verifyCertificate(certificateHash).call();
}

module.exports = { issueCertificate, verifyCertificate };
