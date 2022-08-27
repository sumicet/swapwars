import Big from 'big.js';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { chain, fetchBalance } from '@wagmi/core';
import { BigNumber, ethers } from 'ethers';
import { DECIMALS_BN, PPM } from '../../config/constants';
import { readContract, writeContract } from '../utils/contract';
import { Token } from '../types';
import { config } from '../../config';

export function useSwap({
    amount,
    tokenIn,
    tokenOut,
}: {
    amount: string;
    tokenIn: Exclude<Token, 'Matic'>;
    tokenOut: Exclude<Token, 'Matic'>;
}) {
    const { address } = useAccount();

    const swap = useCallback(async () => {
        try {
            if (!address) {
                console.error('Please connect your wallet.');
                return;
            }

            const balanceTokenIn = await fetchBalance({
                addressOrName: address,
                chainId: chain.polygonMumbai.id,
                token: config.contract[tokenIn],
            });

            const amountBN = BigNumber.from(amount).mul(DECIMALS_BN);

            if (new Big(amount).gt(ethers.utils.formatEther(balanceTokenIn.value))) {
                console.error(`You don't have enough ${tokenIn.toUpperCase()} for this swap.`);
                return;
            }

            const { wait: waitWriteContract } = await writeContract({
                addressOrName: config.contract[tokenIn],
                functionName: 'approve',
                args: [config.contract.TokenSwap, amountBN],
            });

            await waitWriteContract();

            const { wait: waitSwap } = await writeContract({
                addressOrName: config.contract.TokenSwap,
                functionName: 'buy',
                args: [0, amountBN],
            });

            await waitSwap();

            const pool = await readContract({
                addressOrName: config.contract.TokenSwap,
                functionName: 'pools',
                args: [0],
            });

            const swappedAmount = new Big(amount)
                .div(new Big(pool.exchageRate))
                .times(PPM)
                .toPrecision(2);

            console.log(`Congrats! You got ${swappedAmount} ${tokenOut.toUpperCase()}.`);
        } catch (error: any) {
            console.error(error.message || error);
        }
    }, [address, amount, tokenIn, tokenOut]);

    return swap;
}
