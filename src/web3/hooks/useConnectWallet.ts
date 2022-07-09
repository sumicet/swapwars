import { useEffect } from 'react';
import { metaMask } from '../connectors';

export function useConnectWallet() {
    // TODO: Allow other wallets to connect?
    useEffect(() => {
        // TODO: replace with activate and switch chain if needed
        void metaMask.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to metamask');
        });
    }, []);
}
