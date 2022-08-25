import { config } from '../../config';
import grogu from '../../assets/images/grogu.png';
import mando from '../../assets/images/mando.png';
import jawa from '../../assets/images/jawa.png';

export type Tokens = {
    label: string;
    value: string;
    image: string;
} | null;

export interface Amount {
    in: string;
    out: string;
}

export const tokens: Tokens[] = [
    {
        label: 'GROGU',
        value: config.contract.Grogu,
        image: grogu,
    },
    {
        label: 'MANDO',
        value: config.contract.Mando,
        image: mando,
    },
    {
        label: 'JAWA',
        value: 'JAWA',
        image: jawa,
    },
];
