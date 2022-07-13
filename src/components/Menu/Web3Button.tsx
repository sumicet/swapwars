import { Button } from '@chakra-ui/button';
import { installWallet, useWeb3 } from '../../web3';
import { BalancePopover } from './BalancePopover';

export function Web3Button() {
    const { account, ENSName, isLocked, activate, isLoadingWallet } = useWeb3();

    if (ENSName || account) {
        return (
            <BalancePopover>
                <Button variant="plain" size="medium" width="fit-content">
                    {ENSName || account?.slice(0, 6)}...{account?.slice(account.length - 4)}
                </Button>
            </BalancePopover>
        );
    }

    if (isLoadingWallet) {
        return (
            <Button variant="plain" bg="red" size="medium" width="fit-content">
                Connecting
            </Button>
        );
    }

    if (isLocked) {
        return (
            <Button
                variant="orange"
                size="medium"
                onClick={activate}
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
