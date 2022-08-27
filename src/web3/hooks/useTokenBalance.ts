import { chain, FetchBalanceArgs } from '@wagmi/core';
import { useAccount, useBalance } from 'wagmi';

export function useTokenBalance(token: FetchBalanceArgs['token']) {
    const { address } = useAccount();

    const { data, isError, isLoading } = useBalance({
        addressOrName: token ? address : undefined, // BUG: enabled doesn't work https://github.com/wagmi-dev/wagmi/issues/888
        chainId: chain.polygonMumbai.id,
        token,
        watch: !!token,
    });

    if (!address) return { data: null, isError: false, isLoading: true };

    return { data, isError, isLoading };
}
