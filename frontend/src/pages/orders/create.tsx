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

interface NFT {
  title: string;
  id: {
    tokenId: string;
  };
  tokenUri: {
    gateway: string;
    raw: string;
  };
  contract: {
    address: string;
  };
  metadata: {
    name: string;
    description: string;
    image: string;
    attrbiutes: [
      {
        trait_type: string;
        value: string;
      },
    ];
  };
  description: string;
  media: [
    {
      raw: string;
      gateway: string;
    },
  ];
}

const NFTCard = ({ nft }: { nft: NFT }) => {
  return (
    <div className='w-1/4 flex flex-col '>
      <div className='rounded-md'>
        <img className='object-cover h-128 w-full rounded-t-md' src={nft.media[0].gateway}></img>
      </div>
      <div className='flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 '>
        <div className=''>
          <h2 className='text-xl text-gray-800'>{nft.title}</h2>
          <p className='text-gray-600'>Id: {nft.id.tokenId}</p>
          <p className='text-gray-600'>{`${nft.contract.address}`}</p>
        </div>

        <div className='flex-grow mt-2'>
          <p className='text-gray-600'>{nft.description}</p>
        </div>
      </div>
    </div>
  );
};

const SelectGive = ({ addSelectedItem }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log('account address: ', address);
  const [nfts, setNfts] = useState<any>([]);
  const [selected, setSelected] = useState<any>({});

  // Get NFTs
  const web3 = createAlchemyWeb3(
    'https://polygon-mumbai.g.alchemy.com/v2/LCmydbgvaVeJSe-TUIpDkU75E14J4G_W',
  );

  useEffect(() => {
    if (!address) return;
    const getNfts = async () => {
      const nfts = await web3.alchemy.getNfts({ owner: address });
      console.log(nfts);

      if (nfts) {
        const numNfts = nfts.totalCount;
        const nftList = nfts.ownedNfts;

        console.log(`Total NFTs owned by ${address}: ${numNfts} \n`);
        setNfts(nftList);
      }
    };
    getNfts();
  }, []);

  const selectNft = (nft: NFT) => {
    setSelected(nft);
    console.log('nft', selected);
  };

  const addNft = () => {
    console.log('addNft');
    if (!selected) {
      console.log('None selected');
      return;
    }

    const item: Item = {
      name: selected.metadata.name,
      description: selected.metadata.description,
      imageUrl: selected.media[0].gateway,
      tokenId: selected.id.tokenId,
      contractAddress: selected.contract.address,
      symbol: '',
      game: '',
      inputItem: {
        itemType: ItemType.ERC721,
        token: selected.contract.address,
        identifier: selected.id.tokenId,
      },
    };

    addSelectedItem(item);
  };

  return (
    <div>
      <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Select Give</h2>
      {!nfts && (
        <>
          <div>Loading...</div>
        </>
      )}
      {nfts && (
        <>
          <p>My NFTs</p>
          {nfts.map((nft: NFT, index: number) => (
            <div key={index} className='' onClick={() => selectNft(nft)}>
              <img className='object-cover h-16 w-16 rounded-t-md' src={nft.media[0].gateway}></img>
              <h2 className='text-xl text-gray-800'>{nft.title}</h2>
              <p className='text-xs'>ContractAddress: {nft.contract.address}</p>
              <p className='text-xs'>metadata.name: {nft.metadata.name}</p>
              <p className='text-xs'>metadata.description: {nft.metadata.description}</p>
              <p className='text-xs'>metadata.image: {nft.metadata.image}</p>
            </div>
          ))}
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-blod py-2 px-4 rounded'
            onClick={addNft}
          >
            Add NFT
          </button>
        </>
      )}
    </div>
  );
};

const SelectTake = ({ addSelectedItem }) => {
  const testAddress = '0x4c6fd3d91dEDB234f711DDa33B059Eb928562a97';
  console.log('testAddress: ', testAddress);
  const [nfts, setNfts] = useState<any>([]);
  const [selected, setSelected] = useState<any>({});

  // Get NFTs
  const web3 = createAlchemyWeb3(
    'https://polygon-mumbai.g.alchemy.com/v2/LCmydbgvaVeJSe-TUIpDkU75E14J4G_W',
  );

  useEffect(() => {
    if (!testAddress) return;
    const getNfts = async () => {
      const nfts = await web3.alchemy.getNfts({ owner: testAddress });
      console.log(nfts);

      if (nfts) {
        const numNfts = nfts.totalCount;
        const nftList = nfts.ownedNfts;

        console.log(`Total NFTs owned by ${testAddress}: ${numNfts} \n`);
        setNfts(nftList);
      }
    };
    getNfts();
  }, []);

  const selectNft = (nft: NFT) => {
    setSelected(nft);
    console.log('nft', selected);
  };

  const addNft = () => {};

  return (
    <div>
      <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Select Take</h2>
      {!nfts && (
        <>
          <div>Loading...</div>
        </>
      )}
      {nfts && (
        <>
          <p>All Game NFTs</p>
          {nfts.map((nft: NFT, index: number) => (
            <div key={index} className='' onClick={() => selectNft(nft)}>
              <img className='object-cover h-16 w-16 rounded-t-md' src={nft.media[0].gateway}></img>
              <h2 className='text-xl text-gray-800'>{nft.title}</h2>
              <p className='text-xs'>ContractAddress: {nft.contract.address}</p>
              <p className='text-xs'>metadata.name: {nft.metadata.name}</p>
              <p className='text-xs'>metadata.description: {nft.metadata.description}</p>
              <p className='text-xs'>metadata.image: {nft.metadata.image}</p>
            </div>
          ))}
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-blod py-2 px-4 rounded'
            onClick={addNft}
          >
            Add NFT
          </button>
        </>
      )}
    </div>
  );
};

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
    console.log('offerer: ', offerer);

    return;
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
    return; // Create Order seems successful...
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
