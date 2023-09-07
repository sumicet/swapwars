import { Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import { ReactNode } from 'react';
import { Image } from '@chakra-ui/image';
import { useColorModeValue } from '@chakra-ui/system';
import { chain, useAccount, useBalance } from 'wagmi';
import { Button } from '@chakra-ui/button';
import { Token, useDisconnect } from '../../web3';
import { config } from '../../config';
import { stringToFixed } from '../../utils';

/**
 * @param children The popover trigger
 */
export function AccountPopover({ children }: { children: ReactNode }) {
    const { address } = useAccount();
    const { disconnect, isLoading } = useDisconnect();
    
    const textColor = useColorModeValue('light.primary', 'dark.tertiary');
    const labelColor = useColorModeValue('light.secondary', 'dark.secondary');

    return (
        <Popover trigger="hover" placement="bottom-end" matchWidth>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    <VStack spacing="space20" alignItems="flex-start" width="100%">
                        
                        <Button variant="small" onClick={disconnect} isLoading={isLoading}>
                            Disconnect
                        </Button>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
