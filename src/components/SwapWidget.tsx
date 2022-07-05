import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { useState } from 'react';
import { Field } from './Field';
import { WidgetBodyWrapper } from './Widget/WidgetBodyWrapper';
import { WidgetIcon } from './Widget/WidgetIcon';
import { WidgetTitle } from './Widget/WidgetTitle';
import { WidgetWrapper } from './Widget/WidgetWrapper';
import { FiRepeat } from 'react-icons/fi';

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

    return (
        <WidgetWrapper>
            <WidgetTitle title='Pool #0' subtitle='Ratio 2:1' />
            <WidgetBodyWrapper>
                <Field
                    label='You send'
                    value={amount.in}
                    onChange={event => handleChange('in', event)}
                    placeholder='10'
                />

                <WidgetIcon icon={FiRepeat} rotateIcon />

                <Field
                    label='You receive'
                    value={amount.out}
                    onChange={event => handleChange('out', event)}
                    placeholder='5'
                />

                <Text color='primary.medium' variant='small'>
                    Slippage: 0.1
                </Text>
            </WidgetBodyWrapper>
            <Button>Swap</Button>
        </WidgetWrapper>
    );
}
