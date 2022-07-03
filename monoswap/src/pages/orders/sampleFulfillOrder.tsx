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

import { Item } from '@/types';

const SampleFulfillOrder: NextPage = () => {
  // change to {}
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log('account address: ', address);

  const sampleOrder: OrderWithCounter = {
    parameters: {
      offerer: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
      zone: '0x0000000000000000000000000000000000000000',
      zoneHash: '0x3000000000000000000000000000000000000000000000000000000000000000',
      startTime: '1656677746',
      endTime: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      orderType: 0,
      offer: [
        {
          itemType: 2,
          token: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
          identifierOrCriteria: '1',
          startAmount: '1',
          endAmount: '1',
        },
        {
          itemType: 2,
          token: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
          identifierOrCriteria: '2',
          startAmount: '1',
          endAmount: '1',
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
          itemType: 0,
          token: '0x0000000000000000000000000000000000000000',
          identifierOrCriteria: '0',
          startAmount: '100000000000000000',
          endAmount: '100000000000000000',
          recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
        },
      ],
      totalOriginalConsiderationItems: 2,
      salt: '0xd10f06724d683fc1176535ad39143dee',
      conduitKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
      counter: 0,
    },
    signature:
      '0xc06fb4fb11df13d732f76bd3d00b56c3345f8ee8fb7f99a77d468856c3ae42be8c83b548a0d40b0bda988dd8de4b021714fb2f5a676c36b6a761ac76e8daa2fa',
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

export default SampleFulfillOrder;
