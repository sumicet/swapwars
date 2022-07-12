import { useEffect } from 'react';
import { config } from '../../config';
import { metaMask } from '../connectors';

const NO_METAMASK_ERROR = 'NoMetamaskError';
const LOCKED_METAMASK_ERROR = 'LockedMetamaskError';

interface useConnectWalletProps {
    onWalletNotInstalled: () => void;
    onWalletLocked: () => void;
}

// TODO: handle locked case
// TODO: handle no metamask error
export function useConnectWallet({ onWalletNotInstalled, onWalletLocked }: useConnectWalletProps) {
    // TODO: Allow other wallets to connect?
    useEffect(() => {
        console.log('activating');

        // try-catch doesn't work here
        metaMask.activate(config.networks.mumbai).catch((err) => {
            if (!err.name) {
                // Show a toast or something..
                console.log('hey');
            }

            const { name } = err;

            if (name === NO_METAMASK_ERROR) {
                onWalletNotInstalled();
            } else if (name === LOCKED_METAMASK_ERROR) {
                onWalletLocked();
            }
        });
    }, [onWalletLocked, onWalletNotInstalled]);
}
