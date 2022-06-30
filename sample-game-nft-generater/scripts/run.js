const main = async () => {
  const [owner] = await hre.ethers.getSigners();

  const domainContractFactory = await hre.ethers.getContractFactory('SampleGameNFT');
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  
  number = 0;

  uriArray = ["https://jsonkeeper.com/b/65V7","https://jsonkeeper.com/b/V3NC"];
  for (const uri of uriArray) {
    let txn = await domainContract.connect(owner).makeNFT(owner,uri);
    await txn.wait();
    console.log("Minted NFT number:",number);
    number += 1;
  };
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();