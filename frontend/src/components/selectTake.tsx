import { Network, initializeAlchemy, getNftsForCollection } from '@alch/alchemy-sdk';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Item, Order } from '@/types';

// SelectGiveにあるNFTとは違う metadata -> rawMetadata
interface NFT {
  title: string;
  description: string;
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
  rawMetadata: {
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
  media: [
    {
      raw: string;
      gateway: string;
    },
  ];
}

const SelectTake = ({ addSelectedItem }) => {
  const settings = {
    apiKey: 'LCmydbgvaVeJSe-TUIpDkU75E14J4G_W',
    network: Network.MATIC_MUMBAI,
    maxRetries: 10,
  };
  const alchemy = initializeAlchemy(settings);

  const testAddress = '0x5d424ce3fe2c56f2cee681f0c44ae965b41e9043';
  console.log('testAddress: ', testAddress);

  const [nfts, setNfts] = useState<any>([]);
  const [selected, setSelected] = useState<any>({});

  useEffect(() => {
    if (!testAddress) return;
    const getNfts = async () => {
      // Get all NFTs
      const response = await getNftsForCollection(alchemy, testAddress, {});
      console.log('Game NFTs', JSON.stringify(response, null, 2));
      const nfts = response.nfts;
      if (nfts) {
        setNfts(nfts);
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
      name: selected.rawMetadata.name,
      description: selected.rawMetadata.description,
      imageUrl: selected.media[0].gateway,
      tokenId: selected.tokenId,
      contractAddress: selected.contract.address,
      symbol: '',
      gameName: '',
      inputItem: {
        itemType: ItemType.ERC721,
        token: selected.contract.address,
        identifier: selected.tokenId,
      },
    };

    addSelectedItem(item);
  };

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
          {nfts.map((nft: any, index: number) => (
            <div key={index} className='' onClick={() => selectNft(nft)}>
              <img className='object-cover h-16 w-16 rounded-t-md' src={nft.media[0].gateway}></img>
              <h2 className='text-xl text-gray-800'>{nft.title}</h2>
              <p className='text-xs'>ContractAddress: {nft.contract.address}</p>
              <p className='text-xs'>metadata.name: {nft.rawMetadata.name}</p>
              <p className='text-xs'>metadata.description: {nft.rawMetadata.description}</p>
              <p className='text-xs'>metadata.image: {nft.rawMetadata.image}</p>
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

export default SelectTake;
