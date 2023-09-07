import { chain, configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { provider, webSocketProvider } = configureChains([chain.goerli,chain.mainnet], [publicProvider()]);

export const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
});
