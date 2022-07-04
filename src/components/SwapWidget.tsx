import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from 'rooks';
import isNumber from 'lodash/isNumber';
import { Button } from '@chakra-ui/button';
import { SwapPolygon } from './SwapPolygon';
import { Field } from './Field';
import { useToken } from '@chakra-ui/system';

interface Amount {
    in: string;
    out: string;
}

const reverse = (name: keyof Amount) => (name === 'in' ? 'out' : 'in') as keyof Amount;

export function SwapWidget() {
    const [amount, setAmount] = useState<Amount>({ in: '', out: '' });

    const [debouncedAmount] = useDebouncedValue(amount, 200);

    console.log(isNumber('1.2'));

    useEffect(() => {
        console.log(debouncedAmount);
    }, [debouncedAmount]);

    const handleChange = (name: keyof Amount, event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (name === 'in') {
            setAmount({ in: value, out: String(parseFloat(value) / 2) });
        } else {
            setAmount({ in: String(parseFloat(value) * 2), out: value });
        }
    };

    const labelInputSpace = useToken('space', 'space8');

    return (
        <Flex padding='space60' bg='bg.medium' borderRadius='radius14' width='widget'>
            <VStack spacing='space40' alignItems='flex-start' width='100%'>
                <VStack spacing='space4' alignItems='flex-start' width='100%'>
                    <Text variant='large' color='primary.light'>
                        Exchange
                    </Text>
                    <Text variant='medium' color='primary.medium'>
                        Rate 2:1
                    </Text>
                </VStack>
                <VStack spacing='space10' alignItems='flex-end' width='100%'>
                    <Field
                        label='You send'
                        value={amount.in}
                        onChange={event => handleChange('in', event)}
                        placeholder='10'
                    />

                    <Box position='relative' bg='red' width='100%'>
                        <Box
                            position='absolute'
                            left='50%'
                            // TODO Find a better way to get the label height (19px)
                            transform={`translateX(-50%) translateY(calc(-50% + (${labelInputSpace} + 19px) / 2))`}
                        >
                            <SwapPolygon />
                        </Box>
                    </Box>

                    <Field
                        label='You receive'
                        value={amount.out}
                        onChange={event => handleChange('out', event)}
                        placeholder='5'
                    />

                    <Text color='primary.medium' variant='small'>
                        Slippage: 0.1
                    </Text>
                </VStack>
                <Button>Swap</Button>
            </VStack>
        </Flex>
    );
}
