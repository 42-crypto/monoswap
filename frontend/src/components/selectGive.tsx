import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Item, Order } from '@/types';

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
      gameName: '',
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
          {nfts.slice(25, 35).map((nft: NFT, index: number) => (
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

export default SelectGive;