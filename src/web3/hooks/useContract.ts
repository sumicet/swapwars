import { ethers } from 'ethers';
import { config } from '../../config';
import { contracts } from '../../contracts';
import { Contract } from '../types';

export function useContract() {
    const getContract = async (name: Contract) => {
        try {
            let abi;
            if (name === 'Matic') {
                abi = (await contracts.ERC20()).abi;
            } else {
                abi = (await contracts[name]()).abi;
            }
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const accounts = await provider.listAccounts();
            if (!accounts || !accounts.length) {
                return null;
            }

            const account = accounts[0];

            const signer = await provider.getSigner(account);

            return new ethers.Contract(config.contract.deployedAddress[name], abi, signer);
        } catch (err: any) {
            console.log(err);
            return null;
        }
    };

    return getContract;
}
