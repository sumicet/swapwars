import { chain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const injectedConnector = new InjectedConnector({
    chains: [chain.polygonMumbai],
    options: {
        shimChainChangedDisconnect: true,
    },
});
