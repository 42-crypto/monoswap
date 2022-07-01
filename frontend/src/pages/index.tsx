// eslint-disable-next-line import/named
import { User } from 'firebase/auth';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import Layout from '@/components/layout';
import { fetcher } from '@/fetch/fetcher';
import { Order, Game } from '@/types';

const IndexPage: NextPage = () => {
  // Fetch games data
  const { data: gameData, error: gameError } = useSWR('/api/games', fetcher);
  // if (gameError) return <div>Failed to load</div>;
  // if (!gameData) return <div>Loading...</div>;

  // Fetch orders data
  const { data: orderData, error: orderError } = useSWR('/api/orders', fetcher);

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
              {gameData.games.map((game: Game) => (
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
            <ul className=''>
              {orderData.orders.map((order: Order) => (
                <>
                  <li key={order.id} className=''>
                    <div>
                      <Link href={`/orders/${order.id}`}>
                        <a className='text-blue-700 text-xl'>Order {order.id} の詳細ページ</a>
                      </Link>
                      <p className='text-xs'>{JSON.stringify(order)}</p>
                    </div>
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
