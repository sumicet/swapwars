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
                spacing='space30'
                borderRadius='radius40'
                bg={bgColor}
                {...bgOutline}
                _groupHover={{
                    bg: bgHover,
                }}
                _focusVisible={{ bg: bgHover }}
            >
                {children && (
                    <Flex flex={1}>
                        <Flex paddingLeft='space10' width='100%'>
                            {children}
                        </Flex>
                    </Flex>
                )}
                <Flex flex={1} height='100%'>
                    <Input
                        variant={children ? 'halfRound' : undefined}
                        textAlign='end'
                        width='100%'
                        {...rest}
                    />
                </Flex>
            </HStack>
        </VStack>
    );
}
