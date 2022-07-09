import { Flex, VStack } from '@chakra-ui/layout';
import { ReactNode } from 'react';

export function WidgetWrapper({ children }: { children: ReactNode }) {
    return (
        <Flex padding='space60' bg='bg.medium' borderRadius='radius14' width='widget'>
            <VStack spacing='space40' alignItems='flex-start' width='100%'>
                {children}
            </VStack>
        </Flex>
    );
}
