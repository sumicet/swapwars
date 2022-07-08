import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { useState } from 'react';
import { Field } from '../Field';
import { WidgetBodyWrapper, WidgetIcon, WidgetTitle, WidgetWrapper } from './components';
import { FiChevronsDown } from 'react-icons/fi';
import { SelectToken } from '../SelectToken';
import { tokens, Tokens } from './types';

export function FaucetWidget() {
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [token, setToken] = useState<Tokens>();

    const buttonText = !token ? 'Select a token' : 'Send';

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
            </WidgetBodyWrapper>
            <Button variant='purple' isDisabled={buttonText !== 'Send'}>
                {buttonText}
            </Button>
        </WidgetWrapper>
    );
}
