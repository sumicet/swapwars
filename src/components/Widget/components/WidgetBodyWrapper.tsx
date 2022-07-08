import { VStack } from '@chakra-ui/layout';
import { ReactNode } from 'react';

export function WidgetBodyWrapper({ children }: { children: ReactNode }) {
    return (
        <VStack spacing='space10' alignItems='flex-end' width='100%'>
            {children}
        </VStack>
    );
}
