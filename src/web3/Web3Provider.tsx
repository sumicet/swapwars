import { useWeb3React, Web3ContextType, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import type { Eip1193Bridge as Eip1193BridgeType } from '@ethersproject/experimental';
import { metaMask, metamaskHooks } from './connectors';

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metamaskHooks]];

// interface Provider extends EthersWeb3Provider, EIP1193Provider

export interface Web3ProviderProps {
    account: Required<Web3ContextType['account']> | null;
    provider: Eip1193BridgeType['provider'] | null;
    isActivating: Web3ContextType['isActivating'];
    chainId: Required<Web3ContextType['chainId']> | null;
    connector: Web3ContextType['connector'] | null;
    ENSName: Web3ContextType['ENSName'] | null;
    isInstalled: boolean;
    isLocked: boolean;
    activate: () => void | null;
    isLoadingWallet: boolean;
}

export const Web3Context = createContext<Web3ProviderProps>({
    account: null,
    provider: null,
    isActivating: true,
    chainId: null,
    connector: null,
    isInstalled: false,
    isLocked: true,
    activate: () => null,
    ENSName: null,
    isLoadingWallet: true,
});

function Web3LocalProvider({ children }: { children: ReactNode }) {
    const { isActivating, account, chainId, connector, ENSName } = useWeb3React();
    const [provider, setProvider] = useState<Web3ProviderProps['provider']>(null);
    const [isInstalled, setIsInstalled] = useState(true);
    const [isLocked, setIsLocked] = useState(false);
    const [isLoadingWallet, setIsLoadingWallet] = useState(true);

    const onWalletNotInstalled = useCallback(() => setIsInstalled(false), []);

    const activate = useCallback(() => {
        metaMask
            .activate()
            .then(async () => {
                if (!metaMask || !metaMask.provider) {
                    return;
                }

                setIsInstalled(true);

                const web3Provider = new ethers.providers.Web3Provider(metaMask.provider as any);
                // https://docs.metamask.io/guide/ethereum-provider.html#ethereum-provider-api
                // MetaMask's Ethereum JS Provider API is specified by EIP-1193

                // If imported normally, I'm getting a ts error
                // https://github.com/Microsoft/TypeScript/issues/20361#issuecomment-651838744
                const { Eip1193Bridge } = await import('@ethersproject/experimental');

                const eip1193Provider = new Eip1193Bridge(web3Provider.getSigner(), web3Provider);
                setProvider(eip1193Provider.provider);
            })
            .catch(async (err) => {
                if (!metaMask.provider) {
                    onWalletNotInstalled();
                } else {
                    // This error fires even when MetaMask is installed
                    if (err.name === 'NoMetaMaskError') {
                        return;
                    }
                    // TODO: handle error
                    console.log(err);
                }

                setIsLoadingWallet(false);
            });
    }, [onWalletNotInstalled]);

    useEffect(() => {
        if (isLoadingWallet) {
            return;
        }

        if (account) {
            setIsLocked(false);
            // @ts-ignore
            // isLocked is true for a split second at the beginning
            // Checking the selectedAddress fixes it
        } else if (!metaMask.provider?.selectedAddress) {
            setIsLocked(true);
        }
    }, [account, isLoadingWallet]);

    // Connect wallet
    useEffect(() => {
        activate();
    }, [activate]);

    const memoValue = useMemo(
        () => ({
            account: account || null,
            provider: provider || null,
            isActivating,
            chainId: chainId || null,
            connector: connector || null,
            isInstalled,
            isLocked,
            activate,
            ENSName,
            isLoadingWallet,
        }),
        [
            ENSName,
            account,
            activate,
            chainId,
            connector,
            isActivating,
            isInstalled,
            isLoadingWallet,
            isLocked,
            provider,
        ]
    );

    return <Web3Context.Provider value={memoValue}>{children}</Web3Context.Provider>;
}

export function Web3Provider({ children }: { children: ReactNode }) {
    return (
        <Web3ReactProvider connectors={connectors}>
            <Web3LocalProvider>{children}</Web3LocalProvider>
        </Web3ReactProvider>
    );
}
