import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
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
        <title>monoswap</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ConnectButton />
        </div>
      </main>
    </div>
  );
};

export default Home;
