import { Seaport } from '@opensea/seaport-js';
import { ItemType } from '@opensea/seaport-js/lib/constants';
// import { CreateInputItem } from '@opensea/seaport-js/lib/types';
import {
  CreateOrderInput,
  OrderWithCounter,
  // CreateInputItem,
  // ConsiderationInputItem,
  // CurrencyItem,
  // Fee,
} from '@opensea/seaport-js/lib/types';

import { ethers, providers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Layout from '@/components/layout';
import SelectGive from '@/components/selectGive';
import SelectTake from '@/components/selectTake';
import { Item, Order } from '@/types';
import { firebaseApp, firebaseAuth, firebaseFirestore, firestoreAutoId } from '@/utils/firebase';

const CreateOrderPage: NextPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log('account address: ', address);

  const [offerItems, setOfferItems] = useState<Item[]>([]);
  const [considerationItems, setConsiderationItems] = useState<Item[]>([]);

  const [showGive, setShowGive] = useState(false);
  const [showtake, setShowTake] = useState(false);

  const addOfferItem = (item: Item) => {
    console.log('adding offer item...');
    const updatedOfferItems = [...offerItems, item];
    setOfferItems(updatedOfferItems);
  };

  const addConsiderationItem = (item: Item) => {
    console.log('adding consideration item...');
    const updatedConsiderationItems = [...considerationItems, item];
    setConsiderationItems(updatedConsiderationItems);
  };

  const createOrder = async () => {
    const offerer = address;
    if (!offerer) {
      console.log('offerer address not found');
      return;
    }
    console.log('offerer: ', offerer);

    const provider = new providers.Web3Provider(window.ethereum as providers.ExternalProvider);
    const seaport = new Seaport(provider as any);

    const createOrderInput: CreateOrderInput = {
      offer: offerItems.map((item) => item.inputItem),
      consideration: considerationItems.map((item) => item.inputItem),
    };

    console.log('createOrderInput: ', createOrderInput);
    console.log('CREATING ORDER');
    // 1. Do a sample order
    const { executeAllActions } = await seaport?.createOrder(createOrderInput, offerer);
    const order: OrderWithCounter = await executeAllActions();

    // 2. Save order data
    console.log('Order created!: ', order);
    console.log('Stringify: ', JSON.stringify(order));

    const newOrder: Order = {
      id: 'V1-' + firestoreAutoId(),
      createdAt: new Date(),
      fulfilled: false,
      offerer: offerer,
      offerItems: offerItems,
      considerationItems: considerationItems,
      order: order,
    };

    console.log('Creating firestore doc...');
    await setDoc(doc(firebaseFirestore, 'orders', newOrder.id), newOrder);
    console.log('Created firestore doc');
  };

  return (
    <Layout title='Create Order'>
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background'>
        <div className='flex flex-col items-center'>
          <div className='flex items-center space-x-16'>
            <div className='flex flex-col'>
              <h2 className='text-primary font-bold text-h3 text-center mb-8'>Give</h2>
              <div className='flex items-center justify-center glass-outer border-2 border-white/40 h-[308px] w-[308px] p-5 rounded-2xl mb-12'>
                <div className='grid grid-cols-3 grid-rows-3 gap-2'>
                  {offerItems.map((item, index) => (
                    <div
                      key={index}
                      className='glass-inner rounded-2xl h-[84px] w-[84px] border border-white/60'
                    >
                      <img src={item.imageUrl} alt={item.name} className='object-contain p-2' />
                    </div>
                  ))}
                  <div
                    className='flex items-center justify-center glass-inner-empty rounded-2xl h-[84px] w-[84px] border border-white/60'
                    onClick={() => (showGive ? setShowGive(false) : setShowGive(true))}
                  >
                    <img className='h-[30px] w-[30px]' src='/plus.png' alt='plus' />
                  </div>
                  {offerItems.length < 9 - 1 &&
                    [...Array(9 - 1 - offerItems.length)].map((e, i) => (
                      <div
                        key={i}
                        className='glass-inner-empty rounded-2xl h-[84px] w-[84px] border border-white/60'
                      ></div>
                    ))}
                </div>
              </div>
            </div>
            <div className='h-6'>
              <img className='' src='/swap.svg' alt='swap' />
            </div>
            <div className='flex flex-col'>
              <h2 className='text-primary font-bold text-h3 text-center mb-8'>Take</h2>
              <div className='flex items-center justify-center glass-outer border-2 border-white/40 h-[308px] w-[308px] p-5 rounded-2xl mb-12'>
                <div className='grid grid-cols-3 grid-rows-3 gap-2'>
                  {considerationItems.map((item, index) => (
                    <div
                      key={index}
                      className='glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'
                    >
                      <img src={item.imageUrl} alt={item.name} className='object-contain p-2' />
                    </div>
                  ))}
                  <div className='flex items-center justify-center glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'>
                    <img className='h-[30px] w-[30px]' src='/plus.png' alt='plus' />
                  </div>
                  {considerationItems.length < 9 - 1 &&
                    [...Array(9 - 1 - considerationItems.length)].map((e, i) => (
                      <div
                        key={i}
                        className='glass-outer rounded-2xl h-[84px] w-[84px] border border-white/60'
                      ></div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='bg-primary text-white text-[20px] font-bold py-4 px-32 rounded-xl'
              onClick={createOrder}
            >
              Create Order
            </motion.button>
          </div>
        </div>
      </div>
      <SelectGive showGive={showGive} setShowGive={setShowGive} addSelectedItem={addOfferItem} />
    </Layout>
  );
};

export default CreateOrderPage;
