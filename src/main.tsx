import { ChakraProvider } from '@chakra-ui/provider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { theme } from './theme';
import { Web3Provider } from './web3';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Web3Provider>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </Web3Provider>
    </React.StrictMode>
);
