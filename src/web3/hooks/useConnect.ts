import { walletConnected } from 'src/config/constants';
import { chain, useConnect as useWagmiConnect } from 'wagmi';
import { injectedConnector } from '../connectors';

/**
 * Wrapper for `wagmi`'s `useConnect`. Enables the persistent wallet connection
 */
export function useConnect() {
    const {
        connectAsync,
        connect: wagmiConnect,
        ...rest
    } = useWagmiConnect({
        connector: injectedConnector,
        chainId: chain.polygonMumbai.id,
    });

    const connect = async () => {
        await connectAsync();
        localStorage.setItem(walletConnected, 'true');
    };

    return { connect, ...rest };
}
