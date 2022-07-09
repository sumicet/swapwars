import { config } from '../../config';
import grogu from '../../assets/images/grogu.png';
import mando from '../../assets/images/mando.png';
import jawa from '../../assets/images/jawa.png';

export type Tokens = {
    label: string;
    value: string;
    image: string;
} | null;

export const tokens: Tokens[] = [
    {
        label: 'GROGU',
        value: config.contract.deployedAddress.Grogu,
        image: grogu,
    },
    {
        label: 'MANDO',
        value: config.contract.deployedAddress.Mando,
        image: mando,
    },
    {
        label: 'JAWA',
        value: 'JAWA',
        image: jawa,
    },
];
