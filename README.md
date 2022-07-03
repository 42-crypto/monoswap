### プロジェクト名
monoswap
### プロジェクトについて（2-3行）
ゲーミングメタバース向け任意の個数のNFTアイテム同士を物々交換できるプラットフォーム
Openseaが一ヶ月前に公開したマーケットプレイスプロトコル「Seaport」を利用し複数のNFT同士の交換を実現
### 解決しようとしている課題
ゲーミングメタバースで不要なNFTアイテムと自分がほしいNFTアイテムを交換したい
### 使用した技術
- Serport Protocol(Opensea公開のマーケットプレイスプロトコル)
- Alchemy
- Pinata
- React.js
- Next.js
- Firebase(Firebase Auth,Firestore)
- Sign In With Ethreum

### スマートコントラクトのPolygonscanリンク
- Seaportのコントラクト
- Seaportにおけるmonoswapを利用したトランザクション
- サービスのテスト用NFT
- https://mumbai.polygonscan.com/address/0x5d424ce3fe2c56f2cee681f0c44ae965b41e9043
### 直面した課題
- Seaprotocolの情報がリリース直後のため少なく手探りで進めた
---

### 概要
ウォレットで接続したユーザーはOrderの作成、閲覧、Fulfillすることができる。

### Offerer
1. New Orderから新しいオーダー作成画面
2. 自分のウォレットにあるトークン（ERC721・ERC20）からOffer（提供できるアイテムの配列）を選択
3. ゲーム一覧？からConsideration（ほしいアイテムの配列）を選択
4. Orderが存在する期間、Tipを選択
5. Order作成

### Fullfiller
1. Order一覧からフルフィルできるOrderを選択
2. 自分のウォレットの中からConsiderationに合ったトークン（ERC721・ERC20）を選んでFulfillする
