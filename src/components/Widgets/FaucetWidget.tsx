import { Button } from '@chakra-ui/button';
import { useState } from 'react';
import { Field } from '../Field';
import { WidgetBodyWrapper, WidgetIcon, WidgetTitle, WidgetWrapper } from './components';
import { FiChevronsDown } from 'react-icons/fi';
import { SelectToken } from '../SelectToken';
import { tokens, Tokens } from './types';
import { Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';

export function FaucetWidget() {
    const [token, setToken] = useState<Tokens>();

    const buttonText = !token ? 'Select a token' : 'Send';

    const textColor = useColorModeValue('light.secondary', 'dark.secondary');

    return (
        <WidgetWrapper>
            <WidgetTitle
                title='Faucet'
                subtitle="You're about to receive some tokens to test the app"
            />
            <WidgetBodyWrapper>
                <Field label='Token' value='10' placeholder='10' isDisabled type='number'>
                    <SelectToken<Tokens> options={tokens} value={token} onChange={setToken} />
                </Field>

                <WidgetIcon icon={FiChevronsDown} />

                <Field
                    label='Wallet address'
                    value='0xca056Fc710F638d48FF6129C9F57FD691b2c73f6'
                    placeholder='10'
                    isDisabled
                />
                <Text color={textColor} variant='small'>
                    Have fun!
                </Text>
            </WidgetBodyWrapper>
            <Button variant='purple' isDisabled={buttonText !== 'Send'}>
                {buttonText}
            </Button>
        </WidgetWrapper>
    );
}
