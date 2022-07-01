// eslint-disable-next-line import/named
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
import { FC, useCallback, useEffect, useState } from 'react';
import { SiweMessage } from 'siwe';
import useSWR from 'swr';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useNetwork,
  useSignMessage,
} from 'wagmi';

// eslint-disable-next-line import/no-unresolved
import Navbar from '@/components/Navbar';
import { Order, Game } from '@/types';
import { firebaseApp, firebaseAuth, firebaseFirestore } from '@/utils/firebase';

const Home: NextPage = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address: address });
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();

  const [state, setState] = useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
    currentUser?: User;
  }>({});

  const signOut = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setState({});
  };

  const signIn = async () => {
    try {
      const chainId = chain?.id;
      if (!address || !chainId) return alert('No account or chain');

      setState((x) => ({ ...x, error: undefined, loading: true }));

      const nonceRes = await fetch('/api/nonce');
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: await nonceRes.text(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      if (!signature) throw Error('Signature is empty');

      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error('Error verifying message');

      // todo: cloud functionでfirebase authのカスタムトークン認証

      const email = `${address}.3@${firebaseApp.options.authDomain}`;
      const password = address;
      console.log('email', email);
      console.log('pass', password);
      console.log('will firebase sign in');
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
          console.log('success to firebase sign in');
          const user = userCredential.user;
          setState((x) => ({ ...x, currentUser: user, address, loading: false }));
        })
        .catch((error) => {
          console.log('fail firebase sign in');
          createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
              console.log('success to create firebase user');
              const user = userCredential.user;
              setState((x) => ({ ...x, currentUser: user, address, loading: false }));
            })
            .catch((error) => {
              console.log('fail to create firebase user');
              const errorCode = error.code;
              const errorMessage = error.message;
              setState((x) => ({ ...x, address, loading: false }));
              return alert(`error: fail to create firebase user`);
            });
        });
      // @ts-expect-error we are assigning a type to error
    } catch (error: Error) {
      setState((x) => ({ ...x, error, loading: false }));
      return alert(`error: ${error.message}`);
    }
  };

  const didTapCreateOrder = async () => {
    console.log('will create doc');
    await setDoc(doc(firebaseFirestore, 'cities', 'LAbcd'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    });
    console.log('create doc');
  };

  const didTapOrderList = async () => {
    console.log('will create doc');
    await setDoc(doc(firebaseFirestore, 'cities', 'LAbcd'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    });
    console.log('create doc');
  };

  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me');
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
      } catch (_error) {}
    };

    handler();

    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, []);

  if (address) {
    // if wallet is connected
    return (
      <div>
        <div>
          {state.address && state.currentUser
            ? // user has signed in
              Navbar(didTapOrderList, didTapCreateOrder, signOut, address)
            : Navbar(didTapOrderList, didTapCreateOrder, signIn, 'Sign In')}
        </div>
      </div>
    );
  }

  // if wallet is not connected
  return (
    <div>
      <div>
        {connectors.map((connector) => {
          return Navbar(
            didTapOrderList,
            didTapCreateOrder,
            () => connect({ connector }),
            'CONNECT',
          );
        })}
      </div>
    </div>
  );

  // // Fetch games data
  // const { data: gameData, error: gameError } = useSWR('/api/games', fetcher);
  // // if (gameError) return <div>Failed to load</div>;
  // // if (!gameData) return <div>Loading...</div>;

  // // Fetch orders data
  // const { data: orderData, error: orderError } = useSWR('/api/orders', fetcher);

  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>Monoswap</title>
  //       <meta name='description' content='' />
  //       <link rel='icon' href='/favicon.ico' />
  //     </Head>
  //     <main>
  //       <ConnectButton />
  //       <Link href='/orders/sampleCreateOrder'>
  //         <a className='text-blue-700'>Sample Create Order</a>
  //       </Link>
  //       <Link href='/orders/sampleFulfillOrder'>
  //         <a className='text-blue-700'>Sample Fulfill Order</a>
  //       </Link>

  //       <h2 className='font-semibold text-2xl'>Game List</h2>
  //       {gameError && (
  //         <>
  //           <div>Failed to load</div>
  //         </>
  //       )}
  //       {!gameData && (
  //         <>
  //           <div>Loading...</div>
  //         </>
  //       )}
  //       {gameData && (
  //         <>
  //           <ul className=''>
  //             {gameData.games.map((game: Game) => (
  //               <>
  //                 <li key={game.id} className=''>
  //                   <div>
  //                     <p>name: {game.name}</p>
  //                     <p>description: {game.description}</p>
  //                     <p>imageUrl: {game.imageUrl}</p>
  //                   </div>
  //                 </li>
  //               </>
  //             ))}
  //           </ul>
  //         </>
  //       )}

  //       <h2 className='font-semibold text-2xl'>Order List</h2>
  //       {orderError && (
  //         <>
  //           <div>Failed to load</div>
  //         </>
  //       )}
  //       {!orderData && (
  //         <>
  //           <div>Loading...</div>
  //         </>
  //       )}
  //       {orderData && (
  //         <>
  //           <ul className=''>
  //             {orderData.orders.map((order: Order) => (
  //               <>
  //                 <li key={order.id} className=''>
  //                   <div>
  //                     <p className='font-semibold text-xl'>id: {order.id}</p>
  //                     <p>{JSON.stringify(order)}</p>
  //                   </div>
  //                 </li>
  //               </>
  //             ))}
  //           </ul>
  //         </>
  //       )}
  //     </main>
  //   </div>
  // );
};

export default Home;
