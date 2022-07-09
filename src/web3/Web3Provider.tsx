import {
    useWeb3React,
    Web3ContextType,
    Web3ReactHooks,
    Web3ReactPriorityHooks,
    Web3ReactProvider,
} from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { createContext, ReactNode, useMemo } from 'react';
import { metaMask, metamaskHooks } from './connectors';
import { Web3Provider as Web3ProviderEthers } from '@ethersproject/providers';
import { useConnectWallet } from './hooks';

const connectors: [MetaMask, Web3ReactHooks][] = [
    [metaMask, metamaskHooks],
    // [coinbaseWallet, coinbaseWalletHooks],
];

export const Web3Context = createContext<{
    account: Required<Web3ContextType['account']> | null;
    provider: Required<Web3ContextType['provider']> | null;
    isActivating: Web3ContextType['isActivating'];
}>({
    account: null,
    provider: null,
    isActivating: true,
});

function Web3LocalProvider({ children }: { children: ReactNode }) {
    const { isActivating, account, provider } = useWeb3React();

    // Activate the wallet
    useConnectWallet();

    const memoValue = useMemo(
        () => ({
            account: account || null,
            provider: provider || null,
            isActivating,
        }),
        [account, provider]
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
