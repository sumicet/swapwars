import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import { useState } from 'react';
import { Field } from './Field';
import { WidgetBodyWrapper, WidgetIcon, WidgetTitle, WidgetWrapper } from './Widget';
import { FiChevronsDown } from 'react-icons/fi';

export function FaucetWidget() {
    const [walletAddress, setWalletAddress] = useState<string>('');

    return (
        <WidgetWrapper>
            <WidgetTitle
                title='Faucet'
                subtitle="You're about to receive some tokens to test the app"
            />
            <WidgetBodyWrapper>
                <Field label='Token' value='10' placeholder='10' isDisabled />

                <WidgetIcon icon={FiChevronsDown} />

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
            <Button variant='purple'>Send</Button>
        </WidgetWrapper>
    );
}
