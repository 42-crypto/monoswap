// eslint-disable-next-line import/named
import { User } from 'firebase/auth';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useCollection } from 'swr-firestore-v9';

import Layout from '@/components/layout';
import OrderCard from '@/components/ordercard';

import { fetcher } from '@/fetch/fetcher';
import { Order, Game } from '@/types';

const IndexPage: NextPage = () => {
  // Fetch games data
  //const { data: gameData, error: gameError } = useSWR('/api/games', fetcher);
  const { data: gameData, error: gameError } = useCollection('games');
  // if (gameError) return <div>Failed to load</div>;
  // if (!gameData) return <div>Loading...</div>;

  // Fetch orders data
  const { data: orderData, error: orderError } = useCollection('orders');

  const orderExeptFullfilled = orderData ? orderData.filter(order => order.fulfilled == false) : [];

  return (
    <Layout>
      <div className='bg-background flex flex-direction: row'>
        { gameData && (
            <aside className="w-4/12" aria-label="Sidebar">
              <h5 className='font-semibold text-2xl text-white'>Game List</h5>
              <div className="overflow-y-auto py-4 px-3 bg-background rounded ">
                  <ul className="space-y-2">
                    {gameData.map((game) => (
                      <li key={game.name} className=''>
                        <a href="#" className="flex items-center p-2 text-base font-semibold rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">                            <img className = 'w-10 h-w height-auto object-fit-cover' src= {game.imageUrl} />
                            <span className="ml-3">{game.name}</span>
                          </a>
                      </li>
                      ))}
                   </ul>
              </div>
            </aside>
          )
        }

        {orderData && (
          <div className="w-full">
            <ul className= 'items'>
              {orderData.map(order => (
                <>
                  <li key={order.id} className='item glass-outer border-2 border-white/40 p-5 rounded-2xl'>
                    <Link href={`/orders/${order.id}`}>
                      {OrderCard(
                        order.offerItems,
                        order.considerationItems
                      )}
                    </Link>
                  </li>
                </>
              ))}
            </ul>
            <></>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .items {
            display: flex;
            flex-direction : row;
            width: 100%;
            gap: 20px;
            flex-wrap: wrap;
          }
          .item {
            width: 308px;
            height: 308px;
						display: flex;
						justify-content: center;
						align-items: center;
						gap: 28px;
          }
        `}
      </style>
    </Layout>
  );
};

export default IndexPage;
