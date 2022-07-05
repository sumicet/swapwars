import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { useState } from 'react';
import { Field } from './Field';
import { WidgetBodyWrapper } from './Widget/WidgetBodyWrapper';
import { WidgetIcon } from './Widget/WidgetIcon';
import { WidgetTitle } from './Widget/WidgetTitle';
import { WidgetWrapper } from './Widget/WidgetWrapper';

export function FaucetWidget() {
    const [walletAddress, setWalletAddress] = useState<string>('');

    return (
        <WidgetWrapper>
            <WidgetTitle
                title='Faucet'
                subtitle="You're about to receive some tokens to test the app"
            />
            <WidgetBodyWrapper>
                <Field
                    label='Token'
                    value='10'
                    // onChange={event => handleChange('in', event)}
                    placeholder='10'
                />

                <WidgetIcon />

                <Field
                    label='Wallet address'
                    value={walletAddress}
                    onChange={event => setWalletAddress(event.target.value)}
                    placeholder='0x00000000000000000000000000000...000'
                />

                <Text color='primary.medium' variant='small'>
                    Have fun!
                </Text>
            </WidgetBodyWrapper>
            <Button>Send</Button>
        </WidgetWrapper>
    );
}
