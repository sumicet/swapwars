import { config } from '../../config';
import mando from '../../assets/images/mando.png';
import jawa from '../../assets/images/jawa.png';

import usdc from '../../assets/images/USDC.png';
import dai from '../../assets/images/DAI.png';
import ethereum from '../../assets/images/ETH.png';
import solana from '../../assets/images/solana.png';
import { Ethereum,Solana,UsdCoin,Dai } from 'iconsax-react';

export type Tokens = {
    label: string;
    value: string;
    image: string;
    address: string;
} | null;

export interface Amount {
    in: string;
    out: string;
}

export const tokens: Tokens[] = [
    {
        label: 'USDC',
        value: config.contract.Grogu,
        image: usdc,
        address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F'
    },
    {
        label: 'DAI',
        value: config.contract.Mando,
        image: dai,
        address:'0x2899a03ffDab5C90BADc5920b4f53B0884EB13cC'
    },
];
export type Networks = {
    label :string;
    value:string;
    image:string;
} | null;

export const networks: Networks[] = [
    {
        label: 'Ethereum',
        value: 'Ethereum',
        image: ethereum,
    },
    {
        label: 'Solana',
        value: 'Solana',
        image: solana,
    },
];