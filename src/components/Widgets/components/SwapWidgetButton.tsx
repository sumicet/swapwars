import { Button } from '@chakra-ui/button';
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

    const { connect, isLoading, data } = useConnect();

    const handleSwap = () => {
        if (!amount) {
            return;
        }
        swap();
    };

    if (isLoading) {
        return <Button isLoading={isLoading} />;
    }

    if (!data?.account) {
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
