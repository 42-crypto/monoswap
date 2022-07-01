import { ItemType } from '@opensea/seaport-js/lib/constants';
import { Item, Order } from '@/types';

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

const order1: Order = {
  offerer: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
  offerItems: [item1, item2],
  considerationItems: [item3, matic],
  order: {
    parameters: {
      offerer: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
      zone: '0x0000000000000000000000000000000000000000',
      zoneHash: '0x3000000000000000000000000000000000000000000000000000000000000000',
      startTime: '1656678428',
      endTime: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      orderType: 0,
      offer: [
        {
          itemType: 2,
          token: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
          identifierOrCriteria: '1',
          startAmount: '1',
          endAmount: '1',
        },
        {
          itemType: 2,
          token: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
          identifierOrCriteria: '2',
          startAmount: '1',
          endAmount: '1',
        },
      ],
      consideration: [
        {
          itemType: 2,
          token: '0x345186024fff73e0cdc4fed3b565e6c21815c7ed',
          identifierOrCriteria: '8',
          startAmount: '1',
          endAmount: '1',
          recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
        },
        {
          itemType: 0,
          token: '0x0000000000000000000000000000000000000000',
          identifierOrCriteria: '0',
          startAmount: '100000000000000000',
          endAmount: '100000000000000000',
          recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
        },
      ],
      totalOriginalConsiderationItems: 2,
      salt: '0xb6846d99d41a9d4b85f9830c0833fa8f',
      conduitKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
      counter: 0,
    },
    signature:
      '0xa454cfc358c73731fb3abc6e6ee4bf0b932103d7f376a03b35ff67d70fa78507404e42f82cf950aecb332d6bfdb755f68de4b25c57ae4741303762739f6558f5',
  },
};

const order2: Order = {
  offerer: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
  offerItems: [item1],
  considerationItems: [item3, item4, matic],
  order: {
    parameters: {
      offerer: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
      zone: '0x0000000000000000000000000000000000000000',
      zoneHash: '0x3000000000000000000000000000000000000000000000000000000000000000',
      startTime: '1656682739',
      endTime: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      orderType: 0,
      offer: [
        {
          itemType: 2,
          token: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
          identifierOrCriteria: '1',
          startAmount: '1',
          endAmount: '1',
        },
      ],
      consideration: [
        {
          itemType: 2,
          token: '0x345186024fff73e0cdc4fed3b565e6c21815c7ed',
          identifierOrCriteria: '8',
          startAmount: '1',
          endAmount: '1',
          recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
        },
        {
          itemType: 2,
          token: '0x345186024fff73e0cdc4fed3b565e6c21815c7ed',
          identifierOrCriteria: '9',
          startAmount: '1',
          endAmount: '1',
          recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
        },
        {
          itemType: 0,
          token: '0x0000000000000000000000000000000000000000',
          identifierOrCriteria: '0',
          startAmount: '100000000000000000',
          endAmount: '100000000000000000',
          recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
        },
      ],
      totalOriginalConsiderationItems: 3,
      salt: '0x15140dc60387e8a1a9a9bc46eabff473',
      conduitKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
      counter: 0,
    },
    signature:
      '0x1e23088954e5455913f88f7caca0dc4682401fb93d9f0a052b1682741063d8e59e7891cc2b241d1217bf6b5ed362a84ad9ba59de5821f02df5516c923b91b683',
  },
};

const order3: Order = {
  offerer: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
  offerItems: [item1],
  considerationItems: [item3],
  order: {
    parameters: {
      offerer: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
      zone: '0x0000000000000000000000000000000000000000',
      zoneHash: '0x3000000000000000000000000000000000000000000000000000000000000000',
      startTime: '1656682884',
      endTime: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      orderType: 0,
      offer: [
        {
          itemType: 2,
          token: '0xa3e62daa9a071085e44f606cfa5f2480d7e3133a',
          identifierOrCriteria: '1',
          startAmount: '1',
          endAmount: '1',
        },
      ],
      consideration: [
        {
          itemType: 2,
          token: '0x345186024fff73e0cdc4fed3b565e6c21815c7ed',
          identifierOrCriteria: '8',
          startAmount: '1',
          endAmount: '1',
          recipient: '0x96b1bd9E8aF7e3a0d840080690Ca7e30a7b3C852',
        },
      ],
      totalOriginalConsiderationItems: 1,
      salt: '0x4412a9f73ab786e018fb9872c4fefb11',
      conduitKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
      counter: 0,
    },
    signature:
      '0xd83357b2a5de2a7d1df2cfcf5cc3bf93885602d4c624a0e94810894fda931fcef04492cf1c70795f5e3e62cdf589fbc5bf0de4857921806f9780bb23af688df6',
  },
};

export const orders: Order[] = [order1, order2, order3];
