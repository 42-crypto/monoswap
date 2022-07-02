const main = async () => {
  const [owner] = await hre.ethers.getSigners();

  const domainContractFactory = await hre.ethers.getContractFactory('SampleGameNFT');
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  number = 0;

  firstAddressToSend = "" // 1人目のテストユーザーのアドレスを入れる
  uriArrayForOwner = ["https://jsonkeeper.com/b/65V7"]; // 1人目のテストユーザーにmintするNFTのjsonのuri配列を入れる

  for (const uri of uriArrayForOwner) {
    let txn = await domainContract.connect(owner).makeNFT(firstAddressToSend,uri);
    await txn.wait();
    console.log("Minted NFT number:",number);
    number += 1;
  };
  
  secondAddressToSend = "" // 2人目のテストユーザーのアドレスを入れる
  uriArrayForFirstAddress = ["https://jsonkeeper.com/b/65V7","https://jsonkeeper.com/b/V3NC"];　// 2人目のテストユーザーにmintするNFTのjsonのuri配列を入れる
  for (const uri of uriArrayForFirstAddress) {
    let txn = await domainContract.connect(owner).makeNFT(secondAddressToSend,uri);
    await txn.wait();
    console.log("Minted NFT number:",number);
    number += 1;
  };

  thirdAddressToSend = "" // 3人目のテストユーザーのアドレスを入れる
  uriArrayForSecondAddress = ["https://jsonkeeper.com/b/65V7","https://jsonkeeper.com/b/V3NC"]; // 3人目のテストユーザーにmintするNFTのjsonのuri配列を入れる
  for (const uri of  uriArrayForSecondAddress) {
    let txn = await domainContract.connect(owner).makeNFT(thirdAddressToSend,uri);
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
