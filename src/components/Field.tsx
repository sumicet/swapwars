import { Input, InputProps } from '@chakra-ui/input';
import { Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { ReactNode } from 'react';

interface FieldProps extends InputProps {
    label: string;
    children?: ReactNode;
}

export function Field({ label, children, ...props }: FieldProps) {
    return (
        <VStack spacing='space8' align='flex-start' width='100%'>
            <Text variant='small' color='primary.dark'>
                {label}
            </Text>
            <HStack width='100%'>
                {children}
                <Input
                    type='number'
                    variant={children ? 'halfRound' : undefined}
                    width='100%'
                    textAlign='end'
                    {...props}
                />
            </HStack>
        </VStack>
    );
}
