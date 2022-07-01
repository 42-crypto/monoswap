import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { useAccount } from 'wagmi';
import styles from '../styles/Home.module.css';
import { Order, Game } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  if (isConnected) {
    console.log('Connected to: ', address);
  }

  // Fetch games data
  const { data: gameData, error: gameError } = useSWR('/api/games', fetcher);
  // if (gameError) return <div>Failed to load</div>;
  // if (!gameData) return <div>Loading...</div>;

  // Fetch orders data
  const { data: orderData, error: orderError } = useSWR('/api/orders', fetcher);

  return (
    <div className={styles.container}>
      <Head>
        <title>Monoswap</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <ConnectButton />
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
        {!gameData && (
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
        {!orderData && (
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
                      <p className='font-semibold text-xl'>id: {order.id}</p>
                      <p>{JSON.stringify(order)}</p>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
