import { GetContractArgs, PrepareWriteContractConfig, ReadContractConfig } from '@wagmi/core';
import { chain } from 'wagmi';
import {
    getContract as getWagmiContract,
    fetchSigner,
    prepareWriteContract as prepareWriteWagmiContract,
    writeContract as writeWagmiContract,
    readContract as readWagmiContract,
} from 'wagmi/actions';
import { config } from '../../config';
import groguAbi from '../abis/Grogu.json';
import mandoAbi from '../abis/Mando.json';
import tokenSwapAbi from '../abis/TokenSwap.json';

const contract = {
    [config.contract.Grogu]: groguAbi,
    [config.contract.Mando]: mandoAbi,
    [config.contract.TokenSwap]: tokenSwapAbi,
};

export function useContract() {
    const getContract = async (
        args: Omit<GetContractArgs, 'contractInterface' | 'signerOrProvider'>
    ) => {
        const signer = await fetchSigner();
        return getWagmiContract({
            ...args,
            contractInterface: contract[args.addressOrName],
            signerOrProvider: signer,
        });
    };

    const writeContract = async (
        args: Omit<PrepareWriteContractConfig, 'contractInterface' | 'signer' | 'chainId'>
    ) => {
        const signer = await fetchSigner();
        const methodConfig = await prepareWriteWagmiContract({
            ...args,
            contractInterface: contract[args.addressOrName],
            signer,
            chainId: chain.polygonMumbai.id,
        });
        return writeWagmiContract(methodConfig);
    };

    const readContract = async (args: Omit<ReadContractConfig, 'contractInterface' | 'chainId'>) =>
        readWagmiContract({
            ...args,
            contractInterface: contract[args.addressOrName],
            chainId: chain.polygonMumbai.id,
        });

    return { getContract, writeContract, readContract };
}
