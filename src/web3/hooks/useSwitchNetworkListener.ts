import { useEffect } from 'react';
import { config } from '../../config';
import { useWeb3 } from './useWeb3';

/**
 * Switch back to the supported network when the user changes the chainId
 */
export function useSwitchNetworkListener() {
    const { provider, connector } = useWeb3();

    useEffect(() => {
        
        if (!provider || !connector) {
            return () => {};
        }

        const handleNetworkChange = () => {
            // It's recommended to reload the window when the network changes
            // https://docs.metamask.io/guide/ethereum-provider.html#chainchanged
            window.location.reload();

            // Force the user back to the supported network
            connector.activate(config.networks.mumbai)
        };

        provider.on('chainChanged', handleNetworkChange)

        return () => provider.removeListener('chainChanged', handleNetworkChange)
    }, [connector, provider]);
}
