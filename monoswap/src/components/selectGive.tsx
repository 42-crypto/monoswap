import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
// import Backdrop from '@/components/backdrop';
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

const slide = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const SelectGive = ({ showGive, setShowGive, addSelectedItem }) => {
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
    <>
      {showGive && (
        <div className='glass-modal rounded-tl-[20px] border-2 border-white/40 fixed top-0 right-0 h-screen mt-[87px]'>
          {!nfts && (
            <>
              <div>Loading...</div>
            </>
          )}
          <div className='flex flex-col items-start py-8 pl-8 pr-16'>
            <div
              className='mb-6'
              onClick={() => (showGive ? setShowGive(false) : setShowGive(true))}
            >
              <img className='' src='/double_arrow_right.png' alt='double_arrow_right' />
            </div>
            <div className='flex items-start space-x-8'>
              {nfts && (
                <div className='flex flex-col w-[356px] space-y-4'>
                  <form className='w-full'>
                    <label
                      htmlFor='default-search'
                      className='mb-2 text-sm font-medium text-[#8E849E] sr-only'
                    >
                      Search
                    </label>
                    <div className='relative'>
                      <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                        <svg
                          className='w-5 h-5 text-[#8E849E]'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                          ></path>
                        </svg>
                      </div>
                      <input
                        type='search'
                        id='default-search'
                        className='block p-2 pl-10 w-full bg-transparent text-base text-[#8E849E] rounded-xl border-2 border-darkGray focus:ring-primary focus:border-primary '
                        placeholder='Search'
                        required
                      />
                    </div>
                  </form>
                  <div className='overflow-y-auto no-scrollbar grid grid-cols-2 gap-4 h-[709px]'>
                    {nfts.map((nft: NFT, index: number) => (
                      <div
                        key={index}
                        className={`flex flex-col glass-inner-empty h-[222px] rounded-2xl border-2 border-white/50 cursor-pointer`}
                        onClick={() => selectNft(nft)}
                      >
                        <div className='glass-modal-inner rounded-[14px] overflow-hidden flex items-center justify-center'>
                          <img
                            className='object-contain h-[164px] w-[164px] rounded-t-md p-2'
                            src={nft.media[0].gateway}
                          ></img>
                        </div>
                        <div className='flex flex-col item-start pt-[10px] pl-4'>
                          <p className='text-white text-[12px] font-bold'>{nft.metadata.name}</p>
                          <p className='text-white text-[12px]'>Axie Infinity</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {Object.keys(selected).length !== 0 &&
                selected.metadata &&
                selected.metadata.attributes && (
                  <div className='flex flex-col items-center w-[290px] space-y-4'>
                    <div className='flex flex-col items-center space-y-3'>
                      <p className='text-xl text-white font-bold '>{selected.metadata.name}</p>
                      <div className='glass-modal-inner rounded-2xl overflow-hidden h-[178px] w-[198px] border border-white/60 flex items-center justify-center'>
                        <img
                          src={selected.media[0].gateway}
                          alt={selected.metadata.name}
                          className='object-contain h-[160px] w-[160px] p-2'
                        />
                      </div>

                      <div className='flex justify-center space-x-1'>
                        <div>
                          <p className=' text-[#CBC6D2] text-base'>Owned by </p>
                        </div>
                        <div>
                          <a suppressHydrationWarning={true} className='text-[#24D6DD] text-base'>
                            {address ? address.substring(2, 8) : '89678'}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col space-y-4 bg-transparent rounded-2xl border border-white/40 w-full pt-4 px-4'>
                      <div className='flex flex-col w-full space-y-3'>
                        <div className='flex justify-between'>
                          <p className='text-base font-bold text-white'>Description</p>
                          <div className='h-6 w-6 flex items-center justify-between'>
                            <img className='w-3' src='/arrow_up.png' alt='arrow_up' />
                          </div>
                        </div>
                        <div>
                          <p className='text-base text-white'>{selected.metadata.description}</p>
                        </div>
                      </div>
                      <div className='flex flex-col w-full space-y-3 border-t border-white/40 pt-4'>
                        <div className='flex justify-between'>
                          <p className='text-base font-bold text-white'>Properties</p>
                          <div className='h-6 w-6 flex items-center justify-between'>
                            <img className='w-3' src='/arrow_up.png' alt='arrow_up' />
                          </div>
                        </div>
                        <div>
                          <div className='grid grid-cols-2 gap-3'>
                            {selected.metadata.attributes.map((attribute, index) => (
                              <div
                                key={index}
                                className='border border-[#24D6DD] rounded-md p-2 flex flex-col items-center space-y-1'
                              >
                                <p className='text-[12px] text-[#24D6DD]'>{attribute.trait_type}</p>
                                <p className='text-[14px] font-bold text-white'>
                                  {attribute.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col w-full space-y-3 border-t border-white/40 pt-4'>
                        <div className='flex justify-between'>
                          <p className='text-base font-bold text-white'>About</p>
                          <div className='h-6 w-6 flex items-center justify-between'>
                            <img className='w-3' src='/arrow_up.png' alt='arrow_up' />
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col w-full space-y-3 border-t border-white/40 pt-4 pb-8'>
                        <div className='flex justify-between'>
                          <p className='text-base font-bold text-white'>Details</p>
                          <div className='h-6 w-6 flex items-center justify-between'>
                            <img className='w-3' src='/arrow_up.png' alt='arrown_down' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className='bg-primary text-white text-base font-bold w-full py-2 px-4 mt-[28px] rounded-2xl'
                      onClick={addNft}
                    >
                      Add NFT
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <AnimatePresence exitBeforeEnter>
      {showGive && (
        <motion.div
          className='fixed top-0 left-0 w-screen h-screen bg-black z-10'
          variants={backdrop}
          initial='hidden'
          animate='visible'
        >
          <p>TEST</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectGive;
