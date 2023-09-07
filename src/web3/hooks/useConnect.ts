import { walletConnected } from 'src/config/constants';
import { chain, useConnect as useWagmiConnect } from 'wagmi';
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const chains = [chain.goerli]
export const connectors = [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
        chains,
        options: {
        appName: 'wagmi',
        },
    }),
    new WalletConnectConnector({
        chains,
        options: {
            projectId: '...',
        },
    }),
    new InjectedConnector({
        chains,
        options: {
        name: 'Injected',
        shimDisconnect: true,
        },
    }),
]

export function useConnect(index:number) {
    const {
        connectAsync,
        connect: wagmiConnect,
        ...rest
    } = useWagmiConnect({
        connector: connectors[index],
        chainId: chain.goerli.id,
    },
    );

    const connect = async () => {
        await connectAsync();
        localStorage.setItem(walletConnected, 'true');
    };
    return { connect, ...rest };
}
