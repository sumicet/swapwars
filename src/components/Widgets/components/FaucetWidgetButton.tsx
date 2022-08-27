import { Button, ButtonProps } from '@chakra-ui/button';
import { useAccount } from 'wagmi';
import { useConnect, useTokenBalance } from 'src/web3';
import Big from 'big.js';
import { Tokens } from '../types';

export function FaucetWidgetButton({
    onClick,
    token,
}: {
    onClick: ButtonProps['onClick'];
    token: Tokens | undefined;
}) {
    const buttonText = !token ? 'Select a token' : 'Send';

    const { isConnected } = useAccount();
    const { connect, isLoading } = useConnect();
    const { data } = useTokenBalance(token?.value);

    if (isConnected && data && new Big(data?.formatted || '0').gt('10')) {
        return (
            <Button variant="purple" isDisabled>
                You have enough tokens
            </Button>
        );
    }
    if (isConnected) {
        return (
            <Button variant="purple" isDisabled={buttonText !== 'Send'} onClick={onClick}>
                {buttonText}
            </Button>
        );
    }
    // TODO
    return (
        <Button variant="purple" onClick={connect} isLoading={isLoading}>
            Connect wallet
        </Button>
    );
}
