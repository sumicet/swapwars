import { Image } from '@chakra-ui/image';
import { Center, Container, Flex, HStack, Text } from '@chakra-ui/layout';
import { Home } from './pages/Home';
import logo from './assets/images/logo.png';
import { Button } from '@chakra-ui/button';
import { FiSun } from 'react-icons/fi';
import Icon from '@chakra-ui/icon';
import { useColorMode, useColorModeValue } from '@chakra-ui/system';

function App() {
    const { toggleColorMode } = useColorMode();

    const bgColor = useColorModeValue('light.bg.primary', 'dark.bg.primary');
    const textColor = useColorModeValue('accent.normalPurple', 'dark.tertiary');
    const iconColor = useColorModeValue('light.primary', 'dark.tertiary');

    return (
        <Center width='100%' bg={bgColor} flexDirection='column'>
            <HStack spacing='space10' width='100%' padding='space20' align='center'>
                <Image src={logo} boxSize='30px' objectFit='contain' />
                <Text variant='extraLarge' color={textColor}>
                    Swapwars
                </Text>
                <Flex flex={1} alignItems='center' justifyContent='flex-end'>
                    <Button variant='plain' width='fit-content' onClick={toggleColorMode}>
                        <Icon as={FiSun} color={iconColor} />
                    </Button>
                </Flex>
            </HStack>
            <Container centerContent width='100%' flex={1} maxWidth='container' paddingX='space20'>
                <Home />
            </Container>
        </Center>
    );
}

export default App;
