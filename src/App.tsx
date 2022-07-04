import { Center, Container, Flex } from '@chakra-ui/layout';
import { Home } from './pages/Home';

function App() {
    return (
        <Center width='100%' bg='bg.dark'>
            <Container centerContent width='100%' flex={1} maxWidth='container' paddingX='space20'>
                <Home />
            </Container>
        </Center>
    );
}

export default App;
