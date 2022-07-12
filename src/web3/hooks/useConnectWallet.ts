import { useEffect } from 'react';
import { config } from '../../config';
import { metaMask } from '../connectors';

export function useConnectWallet() {
    // TODO: Allow other wallets to connect?
    useEffect(() => {
        try {
            metaMask.activate(config.networks.mumbai);
        } catch (err: any) {
            console.log('Error', err.message);
        }
    }, []);
}
