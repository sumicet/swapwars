import { config } from '../config';

const name = config.networks.mumbai.chainName.toLowerCase();

interface Contracts {
    Grogu: () => Promise<any>;
    Mando: () => Promise<any>;
    TokenSwap: () => Promise<any>;
    ERC20: () => Promise<any>;
}

export const contracts: Contracts = {
    Grogu: () => import(`./${name}/Grogu.json`),
    Mando: () => import(`./${name}/Mando.json`),
    TokenSwap: () => import(`./${name}/TokenSwap.json`),
    ERC20: () => import(`./${name}/ERC20.json`),
};
