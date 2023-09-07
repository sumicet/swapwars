/* eslint-disable no-underscore-dangle */
import { Center, Container } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';
import { useEffect } from 'react';
import { useAccount, useTransaction } from 'wagmi';
import { Home } from './pages/Home';
import { Menu } from './components';
import { useEagerConnect, usePersistNetwork } from './web3';
import {Buffer as bb} from 'buffer'
import process from 'process';
import {Provider} from 'react-redux';
import store from './store'
window.Buffer = window.Buffer || bb;
window.process = process;
function App() {
    const bgColor = useColorModeValue('light.bg.primary', 'dark.bg.primary');

    useEagerConnect();
    usePersistNetwork();

    return (
        <Provider store={store}>
            <Center width="100%" bg={bgColor} flexDirection="column">
                <Menu />
                <Container centerContent width="100%" flex={1} maxWidth="container" paddingX="space20">
                    <Home />
                </Container>
            </Center>
        </Provider>
        
    );
}

export default App;
