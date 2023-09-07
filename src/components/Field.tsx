import { Input, InputProps } from '@chakra-ui/input';
import { Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';
import { ReactNode } from 'react';

interface FieldProps extends InputProps {
    label: string;
    children?: ReactNode;
}

/**
 * Displays an `Input` on the right and `children` on the left
 */
export function Field({ label, children, ...rest }: FieldProps) {
    const labelColor = useColorModeValue('light.primary', 'dark.primary');
    const bgColor = useColorModeValue('transparent', 'dark.bg.primary');
    const bgOutline = useColorModeValue(
        { outline: '1px solid', outlineColor: 'light.bg.primary' },
        {}
    );
    const bgHover = useColorModeValue('light.bg.primary', 'dark.bg.hover.primary');

    return (
        <VStack spacing='space8' align='flex-start' width='100%' role='group'>
            <Text variant='small' color={labelColor}>
                {label}
            </Text>
            <HStack
                width='100%'
                spacing='space10'
                borderRadius='radius14'
                bg={bgColor}
                {...bgOutline}
                _groupHover={{
                    bg: bgHover,
                }}
                _focusVisible={{ bg: bgHover }}
            >
                <Flex flex={3} height='100%' width='70%'>
                    <Input
                        variant={children ? 'halfRound' : undefined}
                        textAlign='start'
                        width='100%'
                        {...rest}
                    />
                </Flex>
                {children && (
                    <Flex flex={1}>
                        <Flex paddingLeft='space0' height='100%' width='100%' paddingRight='space10'>
                            {children}
                        </Flex>
                    </Flex>
                )}
                
            </HStack>
        </VStack>
    );
}
