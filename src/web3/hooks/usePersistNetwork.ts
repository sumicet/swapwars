import { useEffect } from 'react';
import { chain, useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { useDisconnect } from './useDisconnect';

/**
 * Listen to network changes and ask the user to switch back to a supported one
 * if needed
 */
export function usePersistNetwork() {
    const { isConnected } = useAccount();
    const { switchNetworkAsync } = useSwitchNetwork();
    const { chain: network } = useNetwork();
    const { disconnect } = useDisconnect();

    useEffect(() => {
        if (!isConnected) return;

        if (network?.unsupported) {
            disconnect();
        }

        // TODO: Add toast
        switchNetworkAsync?.(chain.polygonMumbai.id).catch((error) => console.error(error));
    }, [disconnect, isConnected, network, switchNetworkAsync]);
}
