import { BigNumber, ethers } from 'ethers';
import { useCallback } from 'react';
import { DECIMALS_BN, PPM } from '../utils/constants';
import { useContract } from './useContract';
import { useWeb3 } from './useWeb3';
import { Token } from '../types';
import { config } from '../../config';

export function useSwap() {
    const getContract = useContract();
    const { provider } = useWeb3();

    const swap = useCallback(
        async ({
            amount,
            tokenIn,
            tokenOut,
        }: {
            amount: string;
            tokenIn: Token;
            tokenOut: Token;
        }) => {
            try {
                if (!provider) {
                    throw new Error('No provider.');
                }

                const swapAmount = BigNumber.from(amount).mul(DECIMALS_BN);
                const TokenIn = await getContract(tokenIn);
                const TokenSwap = await getContract('TokenSwap');

                if (!TokenIn || !TokenSwap) {
                    throw new Error('Contracts issue.');
                }

                // const currentTokenInBalance = await TokenIn.balanceOf(account);

                // console.log(
                //     'TokenIn:',
                //     ethers.utils.formatEther(await currentTokenInBalance.toString())
                // );

                // Find pool id
                const tokenInAddress = config.contract.deployedAddress[tokenIn];
                const tokenOutAddress = config.contract.deployedAddress[tokenOut];

                const pool = await TokenSwap.pools(0);
                console.log(
                    pool.tokenA,
                    pool.tokenB,
                    ethers.utils.formatEther(pool.exchageRate.mul(DECIMALS_BN).div(PPM)).toString(),
                    ethers.utils.formatEther(pool.tokenAsupply).toString(),
                    ethers.utils.formatEther(pool.tokenBsupply).toString()
                );

                // const approval = await TokenIn.approve(TokenSwap.address, swapAmount);
                // await approval.wait();

                // const tx = await TokenSwap.buy(0, swapAmount);
                // await tx.wait();
            } catch (err: any) {
                console.log(err.message);
            }
        },
        [getContract, provider]
    );

    return swap;
}
