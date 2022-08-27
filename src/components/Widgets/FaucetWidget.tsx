import { useState } from 'react';
import { FiChevronsDown } from 'react-icons/fi';
import { useAccount } from 'wagmi';
import { accessFaucet } from 'src/web3';
import { config } from 'src/config';
import { Field } from '../Field';
import {
    FaucetWidgetButton,
    WidgetBodyWrapper,
    WidgetIcon,
    WidgetTitle,
    WidgetWrapper,
} from './components';
import { SelectToken } from '../SelectToken';
import { tokens, Tokens } from './types';

export function FaucetWidget() {
    const [token, setToken] = useState<Tokens>();

    const { address } = useAccount();
    const [addressField, setAddressField] = useState<string | null>(null);

    const handleClick = async () => {
        try {
            const to = addressField || address;
            if (!to) return;

            const { wait } = await accessFaucet({
                mnemonic: config.faucet,
                to,
                addressOrName: config.contract.Grogu,
                amount: '10',
            });

            await wait();

            // TODO: Add modal
            console.log("You've received 10 tokens");
        } catch (error: any) {
            // TODO: Add toast
            console.error(error.message || error);
        }
    };

    return (
        <WidgetWrapper>
            <WidgetTitle title="Faucet" subtitle="Get some tokens to test the app" />
            <WidgetBodyWrapper>
                <Field label="Token" value="10" isDisabled type="number">
                    <SelectToken<Tokens> options={tokens} value={token} onChange={setToken} />
                </Field>

                <WidgetIcon icon={FiChevronsDown} />

                <Field
                    label="Wallet address"
                    defaultValue={address}
                    value={addressField || undefined}
                    onChange={(event) => setAddressField(event.target.value)}
                />
            </WidgetBodyWrapper>
            <FaucetWidgetButton onClick={handleClick} token={token} />
        </WidgetWrapper>
    );
}
