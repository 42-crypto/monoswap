# SmapleNFTGenerater
## setup
```
npm init -y
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
npm install @openzeppelin/contracts
npx hardhat compile
```
## generate NFT
NFTのjsonを[jsonkeeper](https://jsonkeeper.com/)で作成
deploy.jsを開き
addressToSendに送る相手のアドレスをいれる
uriArrayにjsonkeeperで作ったNFTのjsonuriをいれる
に送る相手のアドレスをいれ以下を実行する

```
npx hardhat run scripts/run.js
```
