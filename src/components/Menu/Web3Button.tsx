import { Button } from '@chakra-ui/button';
import { useAccount } from 'wagmi';
import { installWallet, useConnect } from '../../web3';
import { AccountPopover } from './AccountPopover';

export function Web3Button() {
    const { isConnected, address, isConnecting, isDisconnected } = useAccount();
    const { connect, isLoading } = useConnect();

    if (isLoading || isConnecting) {
        return (
            <Button
                isLoading={isLoading || isConnecting}
                variant="orange"
                size="medium"
                textStyle="medium"
                width={165}
            />
        );
    }

    if (isConnected) {
        return (
            <AccountPopover>
                <Button variant="plain" size="medium" width={165}>
                    {address?.slice(0, 6)}...{address?.slice(address.length - 4)}
                </Button>
            </AccountPopover>
        );
    }

    if (isDisconnected) {
        return (
            <Button variant="orange" size="medium" onClick={connect} textStyle="medium" width={165}>
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
            width={165}
        >
            Install MetaMask
        </Button>
    );
}
