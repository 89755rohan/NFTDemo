async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT");
  
    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await MyNFT.deploy();
    console.log("Contract deployed to address:", myNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  //0xB3822083330A73D827c49deD8252BB99b2076346
  // 0x221BE4b637259309Ca0092800d35Fc4AD0C29309
  // 0xF69f80F11a69e0Bf4600F38D4971A616c0a80df3
  //0x2eaEA8a346e951ED96A4a94080A9eEEc17fbf7e4
  //new one"0x19cf36fC2031b2bF519a9f611246a20d3FCcd96f"