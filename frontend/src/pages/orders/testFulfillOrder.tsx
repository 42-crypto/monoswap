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

const TestFulfillOrder: NextPage = () => {
  // change to {}
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log('account address: ', address);

  const sampleOrder: OrderWithCounter = {
    parameters: {
      offerer: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
      zone: '0x0000000000000000000000000000000000000000',
      zoneHash: '0x3000000000000000000000000000000000000000000000000000000000000000',
      startTime: '1656593071',
      endTime: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      orderType: 0,
      offer: [
        {
          itemType: 2,
          token: '0x345186024FFF73E0cdc4feD3b565e6c21815c7Ed',
          identifierOrCriteria: '8',
          startAmount: '1',
          endAmount: '1',
        },
      ],
      consideration: [
        {
          itemType: 2,
          token: '0x345186024FFF73E0cdc4feD3b565e6c21815c7Ed',
          identifierOrCriteria: '9',
          startAmount: '1',
          endAmount: '1',
          recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
        },
      ],
      totalOriginalConsiderationItems: 1,
      salt: '0x0f99ab1d5d6d64ede18bb1c7b7de7527',
      conduitKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
      counter: 0,
    },
    signature:
      '0xdc9b8dfba3abd8c1e4efe838f88d21c4cf1ac8e8bb29f7e1341533f722372ac36958d67af4612fd957ba7a6900401f6ba769e8b33ffbd6ec4f13e2c911fddc8a',
  };

  const testSeaportFulfillOrder = async () => {
    const provider = new providers.Web3Provider(window.ethereum as providers.ExternalProvider);
    const seaport = new Seaport(provider as any);

    const offerer = '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852';
    const fulfiller = '0x0035771fDe0FB16a0403eBeF4d5197A727d5DED1';

    if (address !== fulfiller) {
      console.log('INVALID ADDRESS FOR FULFILLER');
      return;
    }

    // 3. Fulfill order
    try {
      let transactionHash: string;

      const { executeAllActions } = await seaport.fulfillOrder({
        order: sampleOrder,
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
  };

  return (
    <>
      <h1 className='font-semibold text-2xl'>Order 1 (Test)</h1>
      <div>
        <p>Some Order here... Trading A for B</p>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-blod py-2 px-4 rounded'
          onClick={testSeaportFulfillOrder}
        >
          FulFill Order
        </button>
      </div>
    </>
  );
};

export default TestFulfillOrder;
