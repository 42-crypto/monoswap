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
      startTime: '1656657026',
      endTime: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      orderType: 0,
      offer: [
        {
          itemType: 0,
          token: '0x0000000000000000000000000000000000000000',
          identifierOrCriteria: '0',
          startAmount: '100000000000000000',
          endAmount: '100000000000000000',
        },
      ],
      consideration: [
        {
          itemType: 2,
          token: '0xA3e62dAa9a071085e44f606cFa5f2480d7e3133a',
          identifierOrCriteria: '1',
          startAmount: '1',
          endAmount: '1',
          recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
        },
        {
          itemType: 2,
          token: '0xA3e62dAa9a071085e44f606cFa5f2480d7e3133a',
          identifierOrCriteria: '2',
          startAmount: '1',
          endAmount: '1',
          recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
        },
      ],
      totalOriginalConsiderationItems: 2,
      salt: '0xffec368326cae1201c2d2fd8c93dbd65',
      conduitKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
      counter: 0,
    },
    signature:
      '0x7fbb567068960326fc0698c84de40267ccd9093bc010c89df9a85ab4e09d2526175b54531c8adeca4a2e4477c3485b33325f881ae7bdad0f483d18062dd5486e',
  };

  const testSeaportFulfillOrder = async () => {
    const provider = new providers.Web3Provider(window.ethereum as providers.ExternalProvider);
    const seaport = new Seaport(provider as any);

    const fulfiller = '0x0035771fDe0FB16a0403eBeF4d5197A727d5DED1';

    if (address !== fulfiller) {
      console.log('INVALID ADDRESS FOR FULFILLER');
      return;
    }

    // 3. Fulfill order
    try {
      let transactionHash: string;

      console.log('FULFILLORDER');
      const { executeAllActions } = await seaport.fulfillOrder({
        order: sampleOrder,
        accountAddress: fulfiller, // this gives error because not metamask currently connected
      });

      console.log('EXECUTING');
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
        <p>{JSON.stringify(sampleOrder)}</p>
      </div>
    </>
  );
};

export default TestFulfillOrder;
