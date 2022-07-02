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
import { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import SelectGive from '@/components/selectGive';
import SelectTake from '@/components/selectTake';
import { Item, Order } from '@/types';
import { firebaseApp, firebaseAuth, firebaseFirestore, firestoreAutoId } from '@/utils/firebase';

const CreateOrderPage: NextPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log('account address: ', address);

  const [offerItems, setOfferItems] = useState<Item[]>([]);
  const [considerationItems, setConsiderationItems] = useState<Item[]>([]);

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
    <>
      <h1 className='font-semibold text-2xl'>Create Order</h1>
      <div>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Give</h2>
        {offerItems.map((item, index) => (
          <div key={index} className=''>
            <img src={item.imageUrl} alt={item.name} className='object-cover h-32 w-32' />
            <p className='text-sm font-medium text-gray-900'>{item.name}</p>
          </div>
        ))}
      </div>
      <br />
      <div>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Take</h2>
        {considerationItems.map((item, index) => (
          <div key={index} className=''>
            <img src={item.imageUrl} alt={item.name} className='object-cover h-32 w-32' />
            <p className='text-sm font-medium text-gray-900'>{item.name}</p>
          </div>
        ))}
      </div>
      <br />
      <SelectGive addSelectedItem={addOfferItem} />
      <SelectTake addSelectedItem={addConsiderationItem} />
      <br />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-blod py-2 px-4 rounded'
        onClick={createOrder}
      >
        Create Order
      </button>
    </>
  );
};

export default CreateOrderPage;
