import { Center, Container } from '@chakra-ui/layout';
import { Home } from './pages/Home';
import { useColorModeValue } from '@chakra-ui/system';
import { Menu } from './components';

function App() {
    const bgColor = useColorModeValue('light.bg.primary', 'dark.bg.primary');

    return (
        <Center width='100%' bg={bgColor} flexDirection='column'>
            <Menu />
            <Container centerContent width='100%' flex={1} maxWidth='container' paddingX='space20'>
                <Home />
            </Container>
        </Center>
    );
}

export default App;
