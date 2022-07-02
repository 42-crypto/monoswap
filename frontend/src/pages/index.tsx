// eslint-disable-next-line import/named
import { User } from 'firebase/auth';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useCollection } from 'swr-firestore-v9'

import Layout from '@/components/layout';
import OrderCard from '@/components/ordercard';

import { fetcher } from '@/fetch/fetcher';
import { Order, Game } from '@/types';

const IndexPage: NextPage = () => {
  // Fetch games data
  //const { data: gameData, error: gameError } = useSWR('/api/games', fetcher);
  const { data: gameData, error: gameError } = useCollection('games')
  // if (gameError) return <div>Failed to load</div>;
  // if (!gameData) return <div>Loading...</div>;

  // Fetch orders data
  const { data: orderData, error: orderError } = useCollection('orders');

  return (
    <Layout>
      <div className=''>
        <Link href='/orders/sampleCreateOrder'>
          <a className='text-blue-700'>Sample Create Order</a>
        </Link>
        <Link href='/orders/sampleFulfillOrder'>
          <a className='text-blue-700'>Sample Fulfill Order</a>
        </Link>

        <h2 className='font-semibold text-2xl'>Game List</h2>
        {gameError && (
          <>
            <div>Failed to load</div>
          </>
        )}
        {!gameError && !gameData && (
          <>
            <div>Loading...</div>
          </>
        )}
        {gameData && (
          <>
            <ul className=''>
              {gameData.map(game => (
                <>
                  <li key={game.id} className=''>
                    <div>
                      <p>name: {game.name}</p>
                      <p>description: {game.description}</p>
                      <p>imageUrl: {game.imageUrl}</p>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </>
        )}

        <h2 className='font-semibold text-2xl'>Order List</h2>
        {orderError && (
          <>
            <div>Failed to load</div>
          </>
        )}
        {!orderError && !orderData && (
          <>
            <div>Loading...</div>
          </>
        )}
        {orderData && (
          <>
            <ul className= 'mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
              {orderData.map(order => (
                <>
                  <li key={order.id} className=''>
                    <a href= 'orders/{order.id}'>
                      {OrderCard()}
                    </a>
                  </li>
                </>
              ))}
            </ul>
          </>
        )}
      </div>
    </Layout>
  );
};

export default IndexPage;
