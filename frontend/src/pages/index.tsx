import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  if (isConnected) {
    console.log('Connected to: ', address);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Monoswap</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <ConnectButton />

        <div>
          <h2 className='font-semibold text-2xl'>Order List</h2>
          <Link href='/orders/testCreateOrder'>
            <a className='text-blue-700'>Test Create Order</a>
          </Link>
          <ul>
            <li>
              <Link href='#'>
                <a className='text-blue-700'>Order 2</a>
              </Link>
            </li>
            <li>
              <Link href='#'>
                <a className='text-blue-700'>Order 2</a>
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
