import { Flex, VStack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';
import { ReactNode } from 'react';

export function WidgetWrapper({ children }: { children: ReactNode }) {
    const bgColor = useColorModeValue('light.bg.secondary', 'dark.bg.secondary');

    return (
        <Flex padding='space60' bg={bgColor} borderRadius='radius14' width='widget'>
            <VStack spacing='space40' alignItems='flex-start' width='100%'>
                {children}
            </VStack>
        </Flex>
    );
}
