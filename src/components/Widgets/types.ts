import { config } from '../../config';
import grogu from '../../assets/images/grogu.png';
import mando from '../../assets/images/mando.png';
import jawa from '../../assets/images/jawa.png';

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
        image: grogu,
        address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F'
    },
    {
        label: 'DAI',
        value: config.contract.Mando,
        image: mando,
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
        image: jawa,
    },
    {
        label: 'Solana',
        value: 'Solana',
        image: mando,
    },
];