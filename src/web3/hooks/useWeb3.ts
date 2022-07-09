import { useContext } from 'react';
import { Web3Context } from '../Web3Provider';

export function useWeb3() {
    const context = useContext(Web3Context);

    return context;
}
