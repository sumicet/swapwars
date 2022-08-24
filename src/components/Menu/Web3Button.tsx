import { Button } from '@chakra-ui/button';
import { useLocalStorage } from 'react-use';
import { useAccount, useConnect } from 'wagmi';
import { persistWalletConnection } from '../../config/constants';
import { injectedConnector, installWallet } from '../../web3';
import { BalancePopover } from './BalancePopover';

export function Web3Button() {
    const [canConnect, setConnection, removeConnection] = useLocalStorage(persistWalletConnection);
    const { isConnected, address, isConnecting, isDisconnected } = useAccount();
    const { connectAsync } = useConnect({ connector: injectedConnector });

    // const { account, ENSName, isLocked, activate, isLoadingWallet } = useWeb3();

    if (isConnected) {
        return (
            <BalancePopover>
                <Button variant="plain" size="medium" width="fit-content">
                    {address?.slice(0, 6)}...{address?.slice(address.length - 4)}
                </Button>
            </BalancePopover>
        );
    }

    if (isConnecting) {
        return (
            <Button variant="plain" size="medium" width="fit-content">
                Connecting
            </Button>
        );
    }

    if (isDisconnected) {
        const handleConnectWallet = () =>
            connectAsync().catch((error) => console.error(error.message));

        return (
            <Button
                variant="orange"
                size="medium"
                onClick={handleConnectWallet}
                textStyle="medium"
                width="fit-content"
            >
                Connect wallet
            </Button>
        );
    }

    return (
        <Button
            variant="orange"
            size="medium"
            onClick={installWallet}
            textStyle="medium"
            width="fit-content"
        >
            Install MetaMask
        </Button>
    );
}
