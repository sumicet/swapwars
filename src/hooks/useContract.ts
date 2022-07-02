import { ethers } from 'ethers';
import { config } from '../config';
import { contracts } from '../contracts';

type Contract = 'Grogu' | 'Mando' | 'TokenSwap';

export function useContract() {
    const getContract = async (name: Contract) => {
        try {
            const abi = (await contracts[name]()).abi;
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const accounts = await provider.listAccounts();
            if (!accounts || !accounts.length) {
                return;
            }

            const account = accounts[0];

            const signer = await provider.getSigner(account);

            return new ethers.Contract(config.contract.deployedAddress[name], abi, signer);
        } catch (err: any) {
            console.log(err);
        }
    };

    return getContract;
}
