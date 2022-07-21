import { Seaport } from '@opensea/seaport-js';
import { ItemType } from '@opensea/seaport-js/lib/constants';
// import { CreateInputItem } from '@opensea/seaport-js/lib/types';
import {
  CreateOrderInput,
  OrderWithCounter,
  // CreateInputItem,
  // ConsiderationInputItem,
  // CurrencyItem,
  // Fee,
} from '@opensea/seaport-js/lib/types';

import { ethers, providers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { NextPage } from 'next';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Item } from '@/types';

const SampleCreateOrder: NextPage = () => {
  // change to {}
  const account = useAccount();
  console.log('account: ', account);

  // const [offerItems, setOfferItems] = useState<OfferItem[]>([]);
  const offerItems: Item[] = [
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
        token: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
        identifier: '1',
      },
    },
  ];

  const considerationItems: Item[] = [
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
        token: '0x345186024fff73e0cdc4fed3b565e6c21815c7ed',
        identifier: '8',
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
      <h1 className='font-semibold text-2xl'>Sample Create Order Page</h1>
      <div>
        <p className='text-4xl'>{'[A] [B] [C] <-> [D] [E] [F]'}</p>
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

export default SampleCreateOrder;
