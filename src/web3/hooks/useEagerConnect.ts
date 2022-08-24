import { useEffect } from 'react';
import { useConnect } from 'wagmi';
import { useLocalStorage } from 'react-use';
import { injectedConnector } from '../connectors';
import { persistWalletConnection } from '../../config/constants';

// Persist the wallet connection
export function useEagerConnect() {
    const { connectAsync, isSuccess } = useConnect({ connector: injectedConnector });
    const [canConnect] = useLocalStorage(persistWalletConnection);

    console.log(canConnect, 'canConnect');
    useEffect(() => {
        if (isSuccess || !canConnect) return; // Don't try to connect twice, it throws an error

        // TODO: Add toast
        connectAsync().catch((error) => console.error(error.message));
    }, [connectAsync, isSuccess, canConnect]);
}
