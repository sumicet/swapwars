import { chain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const injectedConnector = new InjectedConnector({
    chains: [chain.goerli,chain.mainnet],
    options: {
        shimChainChangedDisconnect: true,
    },
});
