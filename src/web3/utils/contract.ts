import { GetContractArgs, PrepareWriteContractConfig, ReadContractConfig } from '@wagmi/core';
import { chain } from 'wagmi';
import {
    getContract as getWagmiContract,
    prepareWriteContract as prepareWriteWagmiContract,
    writeContract as writeWagmiContract,
    readContract as readWagmiContract,
} from 'wagmi/actions';
import { config } from '../../config';
import { groguAbi, mandoAbi, tokenSwapAbi } from '../abis';

const contract = {
    [config.contract.Grogu]: groguAbi,
    [config.contract.Mando]: mandoAbi,
    [config.contract.TokenSwap]: tokenSwapAbi,
};

/**
 * A wrapper for `wagmi`'s `getContract`. Adds the ABI.
 */
export const getContract = async (args: Omit<GetContractArgs, 'contractInterface'>) =>
    getWagmiContract({
        contractInterface: contract[args.addressOrName],
        ...args,
    });

/**
 * Calls `wagmi`'s `prepareWriteContract` and `writeContract`.
 */
export const writeContract = async (
    args: Omit<PrepareWriteContractConfig, 'contractInterface' | 'chainId'>
) => {
    const methodConfig = await prepareWriteWagmiContract({
        ...args,
        contractInterface: contract[args.addressOrName],
        chainId: chain.polygonMumbai.id,
    });
    return writeWagmiContract(methodConfig);
};

/**
 * A wrapper for `wagmi`'s `readContract`. Adds the ABI & `chainId`.
 */
export const readContract = async (
    args: Omit<ReadContractConfig, 'contractInterface' | 'chainId'>
) =>
    readWagmiContract({
        ...args,
        contractInterface: contract[args.addressOrName],
        chainId: chain.polygonMumbai.id,
    });
