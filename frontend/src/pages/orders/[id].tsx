// import useSWR from 'swr';

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
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDocument } from 'swr-firestore-v9';
import { useAccount } from 'wagmi';
import Layout from '@/components/layout';
import { fetcher } from '@/fetch/fetcher';
import { Item, Order } from '@/types';

const OrderPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log('account address: ', address);

  const router = useRouter();
  const { id } = router.query;

  const { data, update, error } = useDocument(`orders/${id}`);
  // const { data, error } = useSWR(`/api/orders/${id}`, fetcher);

  const fulfillOrder = async () => {
    const provider = new providers.Web3Provider(window.ethereum as providers.ExternalProvider);
    const seaport = new Seaport(provider as any);

    const fulfiller = address;
    if (!data) {
      console.log('data not available');
      return;
    }

    console.log('fulfiller: ', fulfiller);
    console.log('order: ', data.order);
    // 3. Fulfill order
    try {
      let transactionHash: string;

      console.log('FULFILLORDER');
      const { executeAllActions } = await seaport.fulfillOrder({
        order: data.order,
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
    <Layout>
      <p>Order: {id}</p>
      {error && (
        <>
          <div>Failed to load</div>
        </>
      )}
      {!error && !data && (
        <>
          <div>Loading...</div>
        </>
      )}
      {data && (
        <>
          <p>Order Data is available!</p>
          <p className='text-xs'>{JSON.stringify(data.order)}</p>
        </>
      )}
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-blod py-2 px-4 rounded'
        onClick={fulfillOrder}
      >
        FulFill Order
      </button>
    </Layout>
  );
};

export default OrderPage;
