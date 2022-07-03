// eslint-disable-next-line import/named
import { User } from 'firebase/auth';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useCollection } from 'swr-firestore-v9';
import React from 'react';

import Layout from '@/components/layout';
import OrderCard from '@/components/ordercard';
import SearchField from '../components/searchField';

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
      <SearchField />
      <div className='bg-background flex flex-direction: row ' style={{ margin: '2vh auto 0', maxWidth: '78rem' }}>
        { gameData && (
            <aside className="w-4/12" aria-label="Sidebar">
              <img src={"/filter.png"} alt="filter" />;
            </aside>
          )
        }

        {orderData && (
          <div className="w-full" >
            <ul className= 'items justify-center justify-around' style={{ justifyContent: "start" }}>
              {orderData.map(order => (
                <>
                  <li key={order.id} className='item glass-outer border-2 border-white/40 p-5 rounded-2xl' style={{ transform: "scale(0.9)"}}>
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
            flex-wrap: wrap;
          }
          .item {
            width: 308px;
            height: 308px;
						display: flex;
						justify-content: center;
						align-items: center;
						gap: 28px;
            transition-duration: 0.3s;
            cursor: pointer;
          }
          .item:hover {
            opacity: 0.4;
            opacity: 0.6;
            transition-duration: 0.3s;
            background-color: rgb(255 255 255 / 0.6);
          }
        `}
      </style>
    </Layout>
  );
};

export default IndexPage;
