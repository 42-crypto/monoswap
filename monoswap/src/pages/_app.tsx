import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Fuego, FuegoProvider } from 'swr-firestore-v9';
import { WagmiConfig, createClient, defaultChains, configureChains } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { firebaseConfig } from '@/utils/firebase';

// Get environment variables
const alchemyId = process.env.ALCHEMY_ID

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({}),
  publicProvider(),
])

// Set up connectors
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
});


const fuego = new Fuego(firebaseConfig)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FuegoProvider fuego={fuego}>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </FuegoProvider>
  );
}

export default MyApp;
