import { BigNumber, ethers } from 'ethers';
import { useCallback } from 'react';
import { stringToFixed } from '../../utils';
import { Token } from '../types';
import { useContract } from './useContract';
import { useWeb3 } from './useWeb3';

export function useBalance() {
    const { account } = useWeb3();
    const getContract = useContract();

    const getBalance = useCallback(
        async (name: Token) => {
            try {
                const contract = await getContract(name);
                const balanceInWei = await contract?.balanceOf(account);
                const balance = stringToFixed(
                    ethers.utils.formatEther((balanceInWei as BigNumber).toString()),
                    4
                );

                return balance;
            } catch (err: any) {
                // TODO: Handle error
                // console.log(err.message);
                return null;
            }
        },
        [account, getContract]
    );

    return getBalance;
}
