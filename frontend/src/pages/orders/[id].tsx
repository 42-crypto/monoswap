// import useSWR from 'swr';
import { Seaport } from '@opensea/seaport-js';
import { ethers, providers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { doc, setDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDocument } from 'swr-firestore-v9';
import { useAccount } from 'wagmi';
import Layout from '@/components/layout';
import { fetcher } from '@/fetch/fetcher';
import { Item, Order } from '@/types';
import { firebaseFirestore } from '@/utils/firebase';

const OrderPage: NextPage = () => {
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

    try {
      let transactionHash: string;

      const { executeAllActions } = await seaport.fulfillOrder({
        order: data.order,
        accountAddress: fulfiller, // this gives error because not metamask currently connected
      });

      console.log('Executing all actions...');
      const transaction = await executeAllActions();
      console.log('Fulfilled!: ', transaction);
      console.log('Stringify: ', JSON.stringify(transaction));

      transactionHash = transaction.hash;
      console.log('transactionHash: ', transactionHash);

      console.log('Updating doc...');
      data.fulfilled = true;
      await updateDoc(doc(firebaseFirestore, 'orders', data.id), {
        fulfilled: true,
      });
      console.log('Document updated');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title='Order Detail'>
      <div className='flex items-center justify-center h-screen bg-black'>
        <div className='flex flex-col items-center'>
          <div className='flex items-center space-x-16'>
            <div className='flex flex-col'>
              <h2 className='text-primary font-bold text-h3 text-center mb-8'>Give</h2>
              <div className='glass-outer border-2 border-white/40 h-[308px] w-[308px] p-5 rounded-2xl mb-12'>
                <div className='grid grid-cols-3 grid-rows-3 gap-2'>
                  <div className='glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'></div>
                  <div className='glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'></div>
                  <div className='glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'></div>
                  <div className='glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'></div>
                </div>
              </div>
            </div>
            <div className='h-6'>
              <img className='' src='/swap.svg' alt='swap' />
            </div>
            <div className='flex flex-col'>
              <h2 className='text-primary font-bold text-h3 text-center mb-8'>Take</h2>{' '}
              <div className='glass-outer border-2 border-white/40 h-[308px] w-[308px] p-5 rounded-2xl mb-12'>
                <div className='grid grid-cols-3 grid-rows-3 gap-2'>
                  <div className='glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'></div>
                  <div className='glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'></div>
                  <div className='glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'></div>
                  <div className='glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              className='bg-primary text-white text-[20px] font-bold py-4 px-32 rounded-xl'
              onClick={fulfillOrder}
            >
              FulFill
            </button>
          </div>
          <div className='flex justify-center mt-12 space-x-1'>
            <div>
              <p className=' text-darkGray text-base'>Created by</p>
            </div>
            <div>
              <a suppressHydrationWarning={true} className='text-[#24D6DD] text-base'>
                {address}
              </a>
            </div>
          </div>
        </div>

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
        {false && (
          <>
            <div>
              <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
                Give　本当は逆
              </h2>
              {data.offerItems.map((item, index) => (
                <div key={index} className=''>
                  <img src={item.imageUrl} alt={item.name} className='object-cover h-32 w-32' />
                  <p className='text-sm font-medium text-gray-900'>{item.name}</p>
                </div>
              ))}
            </div>
            <br />
            <div>
              <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
                Take　本当は逆
              </h2>
              {data.considerationItems.map((item, index) => (
                <div key={index} className=''>
                  <img src={item.imageUrl} alt={item.name} className='object-cover h-32 w-32' />
                  <p className='text-sm font-medium text-gray-900'>{item.name}</p>
                </div>
              ))}
            </div>
            <br />
          </>
        )}
      </div>
    </Layout>
  );
};

export default OrderPage;
