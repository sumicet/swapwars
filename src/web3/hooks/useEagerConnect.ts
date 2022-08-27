import { useConnect } from 'wagmi';
import { useEffect } from 'react';
import { injectedConnector } from '../connectors';
import { walletConnected } from '../../config/constants';

/**
 * Persist the wallet connection
 *
 * Wrapper around `wagmi`'s `useConnect`
 */
export function useEagerConnect() {
    const {
        connectAsync,
        connect: wagmiConnect,
        ...rest
    } = useConnect({ connector: injectedConnector });

    useEffect(() => {
        const canConnect = localStorage.getItem(walletConnected);

        if (!canConnect) return;

        // TODO: add toast
        connectAsync().catch((error) => console.error(error.message));
    }, [connectAsync]);

    return rest;
}
