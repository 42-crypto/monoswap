import { Seaport } from '@opensea/seaport-js';
import { ItemType } from '@opensea/seaport-js/lib/constants';
// import { CreateInputItem } from '@opensea/seaport-js/lib/types';
import {
  CreateOrderInput,
  ConsiderationInputItem,
  CreateInputItem,
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
        itemType: ItemType.ERC721,
        token: '0x345186024FFF73E0cdc4feD3b565e6c21815c7Ed',
        identifier: '9',
      },
    },
  ];
  // const [considerationItems, setConsiderationItems] = useState<ConsideratinItem[]>([]);
  // const considerationItems: ConsiderationItem[] = [
  //   {
  //     name: '',
  //     description: '',
  //     imageUrl: '',
  //     tokenId: '',
  //     contractAddress: '',
  //     symbol: '',
  //     gameName: '',
  //     inputItem: {
  //       itemType: ItemType.ERC721,
  //       token: '0x345186024FFF73E0cdc4feD3b565e6c21815c7Ed',
  //       identifier: '9',
  //       recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
  //     },
  //   },
  // ];
  const considerationItems: ConsiderationItem[] = [
    {
      name: '',
      imageUrl: '',
      tokenId: '',
      contractAddress: '',
      symbol: '',
      gameName: '',
      inputItem: {
        token: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
        startAmount: ethers.BigNumber.from(0.01).toString(),
        // endAmount: ethers.BigNumber.from(0.01).toString(),
        recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
      },
    },
  ];

  const testSeaportCreateOrder = async () => {
    if (!account) throw Error;
    const provider = new providers.Web3Provider(window.ethereum as providers.ExternalProvider);
    const seaport = new Seaport(provider as any);

    const offerer = '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852';
    const fulfiller = '0x0035771fDe0FB16a0403eBeF4d5197A727d5DED1';

    const createOrderInput: CreateOrderInput = {
      offer: offerItems.map((item) => item.inputItem),
      consideration: considerationItems.map((item) => item.inputItem),
    };
    console.log('createOrderInput: ', createOrderInput);

    // 1. Do a sample order
    const { executeAllActions } = await seaport?.createOrder(createOrderInput, offerer);

    const order: OrderWithCounter = await executeAllActions();
    // 2. Save order data
    console.log('Order created!: ', order);
    console.log('Stringify: ', JSON.stringify(order));

    return; // Create Order seems successful...
    // 3. Fulfill order
    const params = {
      order: order,
      fulfiller,
      offerer,
    };
    console.log(JSON.stringify(params));
    try {
      let transactionHash: string;

      const { executeAllActions } = await seaport.fulfillOrder({
        order,
        accountAddress: fulfiller, // this gives error because not metamask currently connected
      });

      const transaction = await executeAllActions();
      console.log('Fulfilled!: ', transaction);
      console.log('Stringify: ', JSON.stringify(transaction));

      transactionHash = transaction.hash;
      console.log('transactionHash: ', transactionHash);
    } catch (err) {
      console.log(err);
    }
    // const { executeAllActions: executeAllFulfillActions } = await seaport?.fulfillOrder(params);

    // const transaction = executeAllFulfillActions();
    // console.log('Fulfilled!: ', transaction);
    // console.log('Stringify: ', JSON.stringify(transaction));
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
