import { Center, Container } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';
import { Home } from './pages/Home';
import { Menu } from './components';
import { useSwitchNetworkListener } from './web3';

function App() {
    useSwitchNetworkListener();

    const bgColor = useColorModeValue('light.bg.primary', 'dark.bg.primary');

    return (
        <Center width="100%" bg={bgColor} flexDirection="column">
            <Menu />
            <Container centerContent width="100%" flex={1} maxWidth="container" paddingX="space20">
                <Home />
            </Container>
        </Center>
    );
}

export default App;
