import {
  ConsiderationInputItem,
  CreateInputItem,
  OrderWithCounter,
} from '@opensea/seaport-js/lib/types';

// Firestoreユーザー
export type User = {
  address: string;
  // ?
};

// ゲームタイトル
export type Game = {
  name: string;
  imageUrl: string;
};

// OfferやConsiderationに入れるERC721, ERC20, Native Token (atic)など
export type Item = {
  name: string;
  description: string;
  imageUrl: string;
  tokenId: string; // ERC721の場合。ERC20やMaticの場合は '0'
  contractAddress: string; // トークン発行のコントラクトアドレス
  symbol: string;
  game: string; // GameのIDかname
  inputItem: CreateInputItem; // SeaportのOfferやConsiderationの配列を作るために必要な情報はこれだけ
};

// Seaportオーダー
export type Order = {
  offerer: string; // Offererのアドレス
  offerItems: Item[];
  considerationItems: Item[];
  order: OrderWithCounter; // SeaportのcreateOfferが成功した時返されるオブジェクト。FulFillのときに必要
};
