import { ChangeEvent, useState } from 'react';
import { FiRepeat } from 'react-icons/fi';
import { Field } from '../Field';
import {
    WidgetBodyWrapper,
    SwapWidgetButton,
    WidgetIcon,
    WidgetTitle,
    WidgetWrapper,
} from './components';
import { SelectToken } from '../SelectToken';
import { Amount, tokens, Tokens } from './types';

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
            <SwapWidgetButton first={first} second={second} amount={amount} />
        </WidgetWrapper>
    );
}
