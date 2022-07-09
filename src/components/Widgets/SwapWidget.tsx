import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { FormEvent, useState } from 'react';
import { Field } from '../Field';
import { WidgetBodyWrapper, WidgetIcon, WidgetTitle, WidgetWrapper } from '.';
import { FiRepeat } from 'react-icons/fi';
import { SelectToken } from '../SelectToken';
import { tokens, Tokens } from './types';
import { useColorModeValue } from '@chakra-ui/system';

interface Amount {
    in: string;
    out: string;
}

export function SwapWidget() {
    const [amount, setAmount] = useState<Amount>({ in: '', out: '' });

    const handleChange = (field: 'in' | 'out', event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (field === 'in') {
            setAmount({ in: value, out: String(parseFloat(value) / 2) });
        } else {
            setAmount({ in: String(parseFloat(value) * 2), out: value });
        }
    };

    const [first, setFirst] = useState<Tokens>();
    const [second, setSecond] = useState<Tokens>();
    const optionsFirst = tokens.filter(value => value?.value !== second?.value);
    const optionsSecond = tokens.filter(value => value?.value !== first?.value);

    const textColor = useColorModeValue('light.secondary', 'dark.secondary');

    const buttonText =
        !first || !second
            ? 'Select a token'
            : !amount.in || !amount.out
            ? 'Select an amount'
            : 'Swap';

    return (
        <WidgetWrapper>
            <WidgetTitle title='Pool #0' subtitle='Ratio 2:1' />

            <WidgetBodyWrapper>
                <Field
                    label='You send'
                    value={amount.in}
                    onChange={event => handleChange('in', event)}
                    placeholder='10'
                    type='number'
                >
                    <SelectToken<Tokens> value={first} onChange={setFirst} options={optionsFirst} />
                </Field>

                <WidgetIcon icon={FiRepeat} rotateIcon />

                <Field
                    label='You receive'
                    value={amount.out}
                    onChange={event => handleChange('out', event)}
                    placeholder='5'
                    type='number'
                >
                    <SelectToken<Tokens>
                        value={second}
                        onChange={setSecond}
                        options={optionsSecond}
                    />
                </Field>

                <Text color={textColor} variant='small'>
                    Slippage: 0.1
                </Text>
            </WidgetBodyWrapper>
            <Button isDisabled={buttonText !== 'Swap'}>{buttonText}</Button>
        </WidgetWrapper>
    );
}
