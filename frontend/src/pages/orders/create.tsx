import { createAlchemyWeb3 } from '@alch/alchemy-web3';
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
import { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Item } from '@/types';

const item1: Item = {
  name: 'Test 1',
  description: '',
  imageUrl:
    'https://lh3.googleusercontent.com/_kbtYi9Wh7VpSGP5YkqJ7FkngLlR54ybo7NpobkpovLT9BfXXb2EY5gYxI1qL68NQXVSfldMVVsYMBljLkOl2L2AH4VAkXDxLblx=s0',
  tokenId: '1',
  contractAddress: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
  symbol: 'TEST',
  game: 'Test Game',
  inputItem: {
    itemType: ItemType.ERC721,
    token: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
    identifier: '1',
  },
};

const item2: Item = {
  name: 'Test 2',
  description: '',
  imageUrl:
    'https://lh3.googleusercontent.com/LqLlqugUgvi6Kb_oVMWENyFwbpgdskn9Ett-PpPiTmARIoShDAO8yZbc4zWHOfhkEgBw0BKPCfvll9x_MPiicykrjKtJOrPnCYifqQ=s0',
  tokenId: '2',
  contractAddress: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
  symbol: 'TESST',
  game: 'Test Game',
  inputItem: {
    itemType: ItemType.ERC721,
    token: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
    identifier: '2',
  },
};

const item3: Item = {
  name: 'Spongebob 8',
  description: '',
  imageUrl:
    'https://lh3.googleusercontent.com/sRTwriH449KTztJ-MoJ6KrT2WEbxkWEONublwxEneHICcJkBNeP_mvipFGaqPVOpKWW9QCehT_i9Wf_M0N6xMI686n6iGWdi4xRKbg=s0',
  tokenId: '8',
  contractAddress: '0x345186024fff73e0cdc4fed3b565e6c21815c7ed',
  symbol: 'SPONGE',
  game: 'Spongebob Game',
  inputItem: {
    itemType: ItemType.ERC721,
    token: '0x345186024fff73e0cdc4fed3b565e6c21815c7ed',
    identifier: '8',
  },
};

const item4: Item = {
  name: 'Spongebob 9',
  description: '',
  imageUrl:
    'https://lh3.googleusercontent.com/sRTwriH449KTztJ-MoJ6KrT2WEbxkWEONublwxEneHICcJkBNeP_mvipFGaqPVOpKWW9QCehT_i9Wf_M0N6xMI686n6iGWdi4xRKbg=s0',
  tokenId: '9',
  contractAddress: '0x345186024fff73e0cdc4fed3b565e6c21815c7ed',
  symbol: 'SPONGE',
  game: 'Spongebob Game',
  inputItem: {
    itemType: ItemType.ERC721,
    token: '0x345186024fff73e0cdc4fed3b565e6c21815c7ed',
    identifier: '9',
  },
};

const matic: Item = {
  name: 'Matic Token',
  description: '',
  imageUrl: '',
  tokenId: '0',
  contractAddress: '0',
  symbol: 'MATIC',
  game: '',
  inputItem: {
    amount: (0.1 * 10 ** 18).toString(),
    endAmount: (0.1 * 10 ** 18).toString(),
  },
};

const CreateOrderPage: NextPage = () => {
  // change to {}
  const { address } = useAccount();

  const [offerItems, setOfferItems] = useState<Item[]>([item1]);
  const [considerationItems, setConsiderationItems] = useState<Item[]>([item3]);

  // Get NFTs
  const web3 = createAlchemyWeb3(
    'https://polygon-mumbai.g.alchemy.com/v2/LCmydbgvaVeJSe-TUIpDkU75E14J4G_W',
  );

  // const [nfts, setNfts] = useState([]);
  useEffect(() => {
    if (!address) return;
    const getNfts = async () => {
      const nfts = await web3.alchemy.getNfts({ owner: address });
      console.log(nfts);

      // setNfts
    };
    getNfts();
  }, []);

  const testSeaportCreateOrder = async () => {
    // if (!account) throw Error;
    const provider = new providers.Web3Provider(window.ethereum as providers.ExternalProvider);
    const seaport = new Seaport(provider as any);

    const offerer = '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852';

    const createOrderInput: CreateOrderInput = {
      offer: offerItems.map((item) => item.inputItem),
      consideration: considerationItems.map((item) => item.inputItem),
      // fees:
    };

    console.log('createOrderInput: ', createOrderInput);

    console.log('CREATING ORDER');
    // 1. Do a sample order
    const { executeAllActions } = await seaport?.createOrder(createOrderInput, offerer);

    const order: OrderWithCounter = await executeAllActions();

    // 2. Save order data
    console.log('Order created!: ', order);
    console.log('Stringify: ', JSON.stringify(order));
    return; // Create Order seems successful...
  };

  return (
    <>
      <h1 className='font-semibold text-2xl'>Sample Create Order Page</h1>
      <h2 className='text-4xl'>Give</h2>
      <div>
        <ul className=''>
          {offerItems.map((item: Item) => (
            <>
              <li key={item.name} className=''>
                <div className=''>
                  <img className='object-cover h-24 w-24' alt={item.name} src={item.imageUrl} />
                  <p>{item.name}</p>
                </div>
              </li>
            </>
          ))}
        </ul>
        <button>+</button>
        <br />
        <h2 className='text-4xl'>Take</h2>
        <ul className=''>
          {considerationItems.map((item) => (
            <li key={item.name} className=''>
              <div className=''>
                <img className='object-cover h-24 w-24' alt={item.name} src={item.imageUrl} />
                <p>{item.name}</p>
              </div>
            </li>
          ))}
        </ul>
        <button>+</button>
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-blod py-2 px-4 rounded'
        onClick={testSeaportCreateOrder}
      >
        Create Order
      </button>
    </>
  );
};

export default CreateOrderPage;
