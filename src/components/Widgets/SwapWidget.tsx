import { Button } from '@chakra-ui/button';
import { ChangeEvent, useCallback, useState } from 'react';
import { FiRepeat } from 'react-icons/fi';
import { Field } from '../Field';
import { WidgetBodyWrapper, WidgetIcon, WidgetTitle, WidgetWrapper } from '.';
import { SelectToken } from '../SelectToken';
import { tokens, Tokens } from './types';
import { useSwap } from '../../web3';

interface Amount {
    in: string;
    out: string;
}

export function SwapWidget() {
    const [amount, setAmount] = useState<Amount>({ in: '', out: '' });

    const handleChange = (field: 'in' | 'out', event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (field === 'in') {
            setAmount({ in: value, out: String(parseFloat(value) / 2) });
        } else {
            setAmount({ in: String(parseFloat(value) * 2), out: value });
        }
    };

    const [first, setFirst] = useState<Tokens>();
    const [second, setSecond] = useState<Tokens>();
    const optionsFirst = tokens.filter((value) => value?.value !== second?.value);
    const optionsSecond = tokens.filter((value) => value?.value !== first?.value);

    const buttonText =
        !first || !second
            ? 'Select a token'
            : !amount.in || !amount.out
            ? 'Select an amount'
            : 'Swap';

    const swap = useSwap();

    const handleSwap = useCallback(() => {
        if (!amount) {
            return;
        }
        swap({ amount: amount.in, tokenIn: 'Grogu', tokenOut: 'Mando' });
    }, [amount, swap]);

    return (
        <WidgetWrapper>
            <WidgetTitle title="Pool #0" subtitle="Ratio 2:1" />

            <WidgetBodyWrapper>
                <Field
                    label="You send"
                    value={amount.in}
                    onChange={(event) => handleChange('in', event)}
                    placeholder="10"
                    type="number"
                >
                    <SelectToken<Tokens> value={first} onChange={setFirst} options={optionsFirst} />
                </Field>

                <WidgetIcon icon={FiRepeat} rotateIcon />

                <Field
                    label="You receive"
                    value={amount.out}
                    onChange={(event) => handleChange('out', event)}
                    placeholder="5"
                    type="number"
                >
                    <SelectToken<Tokens>
                        value={second}
                        onChange={setSecond}
                        options={optionsSecond}
                    />
                </Field>
            </WidgetBodyWrapper>
            <Button isDisabled={buttonText !== 'Swap'} onClick={handleSwap}>
                {buttonText}
            </Button>
        </WidgetWrapper>
    );
}
