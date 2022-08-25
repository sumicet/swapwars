import { Button } from '@chakra-ui/button';
import { useState } from 'react';
import { FiChevronsDown } from 'react-icons/fi';
import { useAccount } from 'wagmi';
import { Field } from '../Field';
import { WidgetBodyWrapper, WidgetIcon, WidgetTitle, WidgetWrapper } from './components';
import { SelectToken } from '../SelectToken';
import { tokens, Tokens } from './types';

export function FaucetWidget() {
    const [token, setToken] = useState<Tokens>();

    const buttonText = !token ? 'Select a token' : 'Send';
    const { address } = useAccount();

    return (
        <WidgetWrapper>
            <WidgetTitle title="Faucet" subtitle="Get some tokens to test the app" />
            <WidgetBodyWrapper>
                <Field label="Token" value="10" isDisabled type="number">
                    <SelectToken<Tokens> options={tokens} value={token} onChange={setToken} />
                </Field>

                <WidgetIcon icon={FiChevronsDown} />

                <Field label="Wallet address" value={address} isDisabled />
            </WidgetBodyWrapper>
            <Button variant="purple" isDisabled={buttonText !== 'Send'} onClick={() => {}}>
                {buttonText}
            </Button>
        </WidgetWrapper>
    );
}
