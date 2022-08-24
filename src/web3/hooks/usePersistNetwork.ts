import { useEffect } from 'react';
import { chain, useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

/**
 * Listen to network changes and ask the user to switch back to a supported one
 * if needed
 */
export function usePersistNetwork() {
    const { isConnected } = useAccount();
    const { switchNetworkAsync } = useSwitchNetwork();
    const { chain: network } = useNetwork();

    useEffect(() => {
        if (!isConnected && !network?.unsupported) return;

        // TODO: Add toast
        switchNetworkAsync?.(chain.polygonMumbai.id).catch((error) => console.error(error));
    }, [isConnected, network, switchNetworkAsync]);
}
