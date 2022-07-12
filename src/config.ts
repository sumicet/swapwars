import { AddEthereumChainParameter } from '@web3-react/types';
import { ethers } from 'ethers';

const networks: { [key: string]: AddEthereumChainParameter } = {
    mumbai: {
        chainId: 80001,
        chainName: 'Mumbai',
        nativeCurrency: {
            decimals: 18,
            name: 'MATIC',
            symbol: 'MATIC',
        },
        rpcUrls: [
            'https://rpc-mumbai.maticvigil.com',
            'https://matic-mumbai.chainstacklabs.com',
            'https://rpc.ankr.com/polygon_mumbai',
        ],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        iconUrls: ['https://polygonscan.com/images/logo-white.svg?v=0.0.2'],
    },
};

export const config = {
    networks,
    contract: {
        deployedAddress: {
            TokenSwap: '0x226121C1d046956247AAAf9D7497d06Fc90Ac715',
            Grogu: '0x97F4eBA3167dce1185cf036e4E83FA6DB04F03f7',
            Mando: '0xD1531Ca9C706Be842eEA579c8e2DBf8a1e80cA69',
        },
    },
};
