import { config } from '../config';

const name = config.network.name;

interface Contracts {
    Grogu: () => Promise<any>;
    Mando: () => Promise<any>;
    TokenSwap: () => Promise<any>;
    TestTokenA: () => Promise<any>;
    TestTokenB: () => Promise<any>;
}

export const contracts: Contracts = {
    Grogu: () => import(`./${name}/Grogu.json`),
    Mando: () => import(`./${name}/Mando.json`),
    TokenSwap: () => import(`./${name}/TokenSwap.json`),
    TestTokenA: () => import(`./${name}/TestTokenA.json`),
    TestTokenB: () => import(`./${name}/TestTokenB.json`),
};
