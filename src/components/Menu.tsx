import { Image } from '@chakra-ui/image';
import { Box, HStack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { FiSun } from 'react-icons/fi';
import Icon from '@chakra-ui/icon';
import { useColorMode, useColorModeValue } from '@chakra-ui/system';
import logo from '../assets/images/logo.png';
import { useWeb3 } from '../web3';

export function Menu() {
    const { toggleColorMode } = useColorMode();

    const textColor = useColorModeValue('accent.normalPurple', 'dark.tertiary');
    const iconColor = useColorModeValue('light.primary', 'dark.tertiary');
    const walletAddressBgColor = useColorModeValue('light.bg.secondary', 'dark.bg.secondary');

    const { account } = useWeb3();

    return (
        <HStack spacing='space10' width='100%' padding='space20' align='center'>
            <Image src={logo} boxSize='30px' objectFit='contain' />
            <Text variant='extraLarge' color={textColor}>
                Swapwars
            </Text>
            <HStack spacing='space20' flex={1} alignItems='center' justifyContent='flex-end'>
                <Box
                    bg={walletAddressBgColor}
                    width='fit-content'
                    padding='space20'
                    borderRadius='radius14'
                >
                    <Text variant='medium' color={iconColor}>
                        {account?.slice(0, 6)}...{account?.slice(account.length - 4)}
                    </Text>
                </Box>
                <Button variant='plain' width='fit-content' onClick={toggleColorMode}>
                    <Icon as={FiSun} color={iconColor} />
                </Button>
            </HStack>
        </HStack>
    );
}
