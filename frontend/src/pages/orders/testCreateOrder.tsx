import { Seaport } from '@opensea/seaport-js';
import { ItemType } from '@opensea/seaport-js/lib/constants';
// import { CreateInputItem } from '@opensea/seaport-js/lib/types';
import {
  CreateOrderInput,
  CreateInputItem,
  ConsiderationInputItem,
  CurrencyItem,
  Fee,
  OrderWithCounter,
} from '@opensea/seaport-js/lib/types';

import { ethers, providers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { NextPage } from 'next';
import { useState } from 'react';
import { useAccount } from 'wagmi';

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
  description: string;
  imageUrl: string;
  tokenId: string;
  contractAddress: string;
  symbol: string;
  gameName: string;
  inputItem: ConsiderationInputItem;
};

const TestCreateOrder: NextPage = () => {
  // change to {}
  const account = useAccount();
  console.log('account: ', account);

  // const [offerItems, setOfferItems] = useState<OfferItem[]>([]);
  const offerItems: OfferItem[] = [
    {
      name: '',
      description: '',
      imageUrl: '',
      tokenId: '',
      contractAddress: '',
      symbol: '',
      gameName: '',
      inputItem: {
        amount: (0.1 * 10 ** 18).toString(),
        endAmount: (0.1 * 10 ** 18).toString(),
      },
    },
  ];

  // const [considerationItems, setConsiderationItems] = useState<ConsideratinItem[]>([]);
  const considerationItems: ConsiderationItem[] = [
    {
      name: '',
      description: '',
      imageUrl: '',
      tokenId: '',
      contractAddress: '',
      symbol: '',
      gameName: '',
      inputItem: {
        itemType: ItemType.ERC721,
        token: '0xA3e62dAa9a071085e44f606cFa5f2480d7e3133a',
        identifier: '1',
      },
    },
    {
      name: '',
      description: '',
      imageUrl: '',
      tokenId: '',
      contractAddress: '',
      symbol: '',
      gameName: '',
      inputItem: {
        itemType: ItemType.ERC721,
        token: '0xA3e62dAa9a071085e44f606cFa5f2480d7e3133a',
        identifier: '2',
      },
    },
  ];

  const testSeaportCreateOrder = async () => {
    if (!account) throw Error;
    const provider = new providers.Web3Provider(window.ethereum as providers.ExternalProvider);
    const seaport = new Seaport(provider as any);

    const offerer = '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852';

    const createOrderInput: CreateOrderInput = {
      offer: offerItems.map((item) => item.inputItem),
      consideration: considerationItems.map((item) => item.inputItem),
      // fees:
    };

    console.log('createOrderInput: ', createOrderInput);

    console.log('CREATING ORDER');
    // 1. Do a sample order
    const { executeAllActions } = await seaport?.createOrder(createOrderInput, offerer);

    const order: OrderWithCounter = await executeAllActions();
    // 2. Save order data
    console.log('Order created!: ', order);
    console.log('Stringify: ', JSON.stringify(order));

    return; // Create Order seems successful...
  };

  return (
    <>
      <h1 className='font-semibold text-2xl'>Order 1 (Test)</h1>
      <div>
        <p>Some Order here... Trading A for B</p>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-blod py-2 px-4 rounded'
          onClick={testSeaportCreateOrder}
        >
          Create Order
        </button>
      </div>
    </>
  );
};

export default TestCreateOrder;
