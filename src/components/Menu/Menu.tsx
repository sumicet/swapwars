import { Image } from '@chakra-ui/image';
import { HStack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { FiSun } from 'react-icons/fi';
import Icon from '@chakra-ui/icon';
import { useColorMode, useColorModeValue } from '@chakra-ui/system';
import logo from '../../assets/images/logo.png';
import { Web3Button } from './Web3Button';

export function Menu() {
    const { toggleColorMode } = useColorMode();

    const textColor = useColorModeValue('accent.normalPurple', 'dark.tertiary');
    const iconColor = useColorModeValue('light.primary', 'dark.tertiary');

    return (
        <HStack spacing="space10" width="100%" padding="space20" align="center">
            <Image src={logo} boxSize="30px" objectFit="contain" />
            <Text variant="extraLarge" color={textColor}>
                Swapwars
            </Text>
            <HStack spacing="space20" flex={1} alignItems="center" justifyContent="flex-end">
                <Web3Button />
                <Button variant="plain" width="fit-content" onClick={toggleColorMode}>
                    <Icon as={FiSun} color={iconColor} />
                </Button>
            </HStack>
        </HStack>
    );
}
