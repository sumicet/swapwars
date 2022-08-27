import { Button } from '@chakra-ui/button';
import { useAccount } from 'wagmi';
import { useConnect, useSwap } from '../../../web3';
import { Amount, Tokens } from '../types';

export function SwapWidgetButton({
    first,
    second,
    amount,
}: {
    first: Tokens | undefined;
    second: Tokens | undefined;
    amount: Amount;
}) {
    const swap = useSwap({ tokenIn: 'Grogu', tokenOut: 'Mando', amount: amount.in });

    const { connect, isLoading } = useConnect();
    const { isConnected, isConnecting } = useAccount();

    const handleSwap = () => {
        if (!amount) {
            return;
        }
        swap();
    };

    if (isLoading || isConnecting) {
        return <Button isLoading={isLoading || isConnecting} />;
    }

    if (!isConnected) {
        return (
            <Button variant="purple" onClick={connect}>
                Connect wallet
            </Button>
        );
    }

    if (!first || !second) {
        return <Button isDisabled>Select a token</Button>;
    }

    if (!amount.in || !amount.out) {
        return <Button isDisabled>Select an amount</Button>;
    }

    return <Button onClick={handleSwap}>Swap</Button>;
}
