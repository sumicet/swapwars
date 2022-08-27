import { chain, PrepareWriteContractConfig } from '@wagmi/core';
import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { getContract } from './contract';

/**
 * @param to Address
 * @param mnemonic The faucet's secret recovery phrase
 * @param addressOrName The address of the contract (associated with the token
 * the user wants to receive)
 * @param amount The amount of tokens to transfer
 */
export async function accessFaucet({
    mnemonic,
    to,
    amount,
    addressOrName,
}: { mnemonic: string; to: string; amount: string } & Pick<
    PrepareWriteContractConfig,
    'addressOrName'
>) {
    const jsonProvider = new ethers.providers.JsonRpcProvider(
        { url: chain.polygonMumbai.rpcUrls.public || '' },
        chain.polygonMumbai.id
    );

    const faucetPrivateKey = ethers.Wallet.fromMnemonic(mnemonic).privateKey;
    // This wallet will sign transactions automatically
    const faucetWallet = new ethers.Wallet(faucetPrivateKey, jsonProvider);

    const contract = await getContract({
        addressOrName,
        signerOrProvider: faucetWallet,
    });

    return contract.functions.transfer(to, parseUnits(amount));
}
