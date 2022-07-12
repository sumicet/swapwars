import { Image } from '@chakra-ui/image';
import { Box, HStack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { FiSun } from 'react-icons/fi';
import Icon from '@chakra-ui/icon';
import { useColorMode, useColorModeValue } from '@chakra-ui/system';
import { useDisclosure } from '@chakra-ui/hooks';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/modal';
import logo from '../assets/images/logo.png';
import metamask from '../assets/images/metamask.png';
import { useWeb3 } from '../web3';

export function Menu() {
    const { toggleColorMode } = useColorMode();

    const textColor = useColorModeValue('accent.normalPurple', 'dark.tertiary');
    const iconColor = useColorModeValue('light.primary', 'dark.tertiary');
    const walletAddressBgColor = useColorModeValue('light.bg.secondary', 'dark.bg.secondary');

    const { account, isInstalled } = useWeb3();

    const { isOpen, onClose, onToggle } = useDisclosure();

    return (
        <HStack spacing="space10" width="100%" padding="space20" align="center">
            <Image src={logo} boxSize="30px" objectFit="contain" />
            <Text variant="extraLarge" color={textColor}>
                Swapwars
            </Text>
            <HStack spacing="space20" flex={1} alignItems="center" justifyContent="flex-end">
                {isInstalled ? (
                    <Box
                        bg={walletAddressBgColor}
                        width="fit-content"
                        padding="space20"
                        borderRadius="radius14"
                    >
                        <Text variant="medium" color={iconColor}>
                            {account?.slice(0, 6)}...{account?.slice(account.length - 4)}
                        </Text>
                    </Box>
                ) : (
                    <Box>
                        <Button width="fit-content" variant="plain" onClick={onToggle}>
                            Install wallet
                        </Button>

                        <Modal isOpen={isOpen} onClose={onClose} isCentered>
                            <ModalContent>
                                <ModalHeader>Select a wallet</ModalHeader>
                                <ModalBody>
                                    <Button variant="purple">
                                        <HStack spacing="space10">
                                            <Image src={metamask} boxSize="space40" />
                                            <Text variant="medium" color="light.bg.secondary">
                                                Install MetaMask
                                            </Text>
                                        </HStack>
                                    </Button>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Box>
                )}
                <Button variant="plain" width="fit-content" onClick={toggleColorMode}>
                    <Icon as={FiSun} color={iconColor} />
                </Button>
            </HStack>
        </HStack>
    );
}
