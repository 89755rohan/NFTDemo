require("dotenv").config();
const API_URL=process.env.API_URL;
const PUBLIC_KEY= process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

console.log(JSON.stringify(contract.abi));

const contractAddress= "0x19cf36fC2031b2bF519a9f611246a20d3FCcd96f";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURL){
    const nonce = await web3.getTransactionCount(PUBLIC_KEY,"letest");
    const tx = {
        'from' : PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 300000,
        'data':nftContract.methods.mintNFT(PUBLIC_KEY, tokenURL).encodeABI
    };
}


const signPromise = web3.eth.accounts.signTransaction(tx ,PRIVATE_KEY);
signPromise
  .then((signedTx) => {
    web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (err, hash) {
        if (!err) {
          console.log(
            "The hash of your transaction is: ",
            hash,
            "\n Check Alchemy's Mempool to view the status of your transaction!"
          );
        } else {
          console.log(
            "Something went wrong when submitting your transaction:",
            err
          );
        }
      }
    );
  })
  .catch((err) => {
    console.log(" Promise failed:", err);
  });


mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmQMUMkKRdVNEv46y9EwmzsnbJV27pH4yMNjRPSnzD9uDD"
);


// require('dotenv').config();
// const ethers = require('ethers');

// // Get Alchemy App URL
// const API_KEY = process.env.API_KEY

// // Define an Alchemy Provider
// const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)

// // Get contract ABI file
// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// // Create a signer
// const PRIVATE_KEY = process.env.PRIVATE_KEY
// const signer = new ethers.Wallet(PRIVATE_KEY, provider)

// // Get contract ABI and address
// const abi = contract.abi
// const contractAddress = '0x19cf36fC2031b2bF519a9f611246a20d3FCcd96f';

// // Create a contract instance
// const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// // Get the NFT Metadata IPFS URL
// const tokenUri = "https://gateway.pinata.cloud/ipfs/QmQMUMkKRdVNEv46y9EwmzsnbJV27pH4yMNjRPSnzD9uDD"

// // Call mintNFT function
// const mintNFT = async () => {
//     let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
//     await nftTxn.wait()
//     console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
// }

// mintNFT()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });