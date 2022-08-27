import { walletConnected } from 'src/config/constants';
import { useDisconnect as useWagmiDisconnect } from 'wagmi';

/**
 * Wrapper for `wagmi`'s `useDisconnect`. Disables the persistent wallet connection
 */
export function useDisconnect() {
    const { disconnect: wagmiDisconnect, disconnectAsync, ...rest } = useWagmiDisconnect();

    const disconnect = async () => {
        await disconnectAsync();
        localStorage.removeItem(walletConnected);
    };

    return { disconnect, ...rest };
}
