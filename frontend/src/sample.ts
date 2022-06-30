import { ConsiderationInputItem, CreateInputItem } from '@opensea/seaport-js/lib/types';

// FROM SEAPORT-JS
export type Fee = {
  recipient: string;
  basisPoints: number;
};

export type CreateOrderInput = {
  conduitKey?: string;
  zone?: string;
  startTime?: string;
  endTime?: string;
  offer: readonly CreateInputItem[];
  consideration: readonly ConsiderationInputItem[];
  counter?: number;
  fees?: readonly Fee[];
  allowPartialFills?: boolean;
  restrictedByZone?: boolean;
  useProxy?: boolean;
  salt?: string;
};

// ELSE

export type User = {};

export type Game = {};

export type Item = {
  name: string;
  description: string;
  imageUrl: string;
  tokenId: string;
  address: string;
  symbol: string;
  gameName: string;
  attributes: [
    {
      trait_type: string;
      value: any;
    },
  ];
};

export type Order = {};

// firestore + seaport data structures
export type OfferItem = {
  name: string;
  description: string;
  imageUrl: string;
  tokenId: string;
  contractAddress: string;
  symbol: string;
  gameName: string;
  inputItem: CreateInputItem;
};

export type ConsiderationItem = {
  name: string;
  imageUrl: string;
  tokenId: string;
  contractAddress: string;
  symbol: string;
  gameName: string;
  inputItem: ConsiderationInputItem;
};
