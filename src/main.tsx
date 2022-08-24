import { ChakraProvider } from '@chakra-ui/provider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiConfig } from 'wagmi';
import App from './App';
import './index.css';
import { theme } from './theme';
import { client } from './web3';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WagmiConfig client={client}>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </WagmiConfig>
    </React.StrictMode>
);
