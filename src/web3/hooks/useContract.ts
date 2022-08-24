import { ethers } from 'ethers';
import { useCallback } from 'react';
import { config } from '../../config';
import { Contract } from '../types';

export function useContract() {
    const getContract = useCallback(async (name: Contract) => {
        try {
            let abi;
            if (name === 'Matic') {
                abi = (await import('../abis/ERC20.json')).default;
            } else {
                abi = (await import(`../abis/${name}.json`)).default;
            }
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const accounts = await provider.listAccounts();
            if (!accounts || !accounts.length) {
                return null;
            }

            const account = accounts[0];

            const signer = provider.getSigner(account);

            return new ethers.Contract(config.contract.deployedAddress[name], abi, signer);
        } catch (err: any) {
            console.error('#Contract error:', err);
            return null;
        }
    }, []);

    return getContract;
}
