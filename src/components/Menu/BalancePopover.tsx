import { HStack, Text, VStack } from '@chakra-ui/layout';
import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import { ReactNode, useEffect, useState } from 'react';
import { Image } from '@chakra-ui/image';
import { useColorModeValue } from '@chakra-ui/system';
import { Token, useBalance } from '../../web3';
import grogu from '../../assets/images/grogu.png';
import mando from '../../assets/images/mando.png';
import matic from '../../assets/images/matic.png';

type Balances =
    | {
          [key in Token]: string | null;
      };

const TokenImages: Balances = {
    Matic: matic,
    Grogu: grogu,
    Mando: mando,
};

/**
 * @param children The popover trigger
 */
export function BalancePopover({ children }: { children: ReactNode }) {
    const [balances, setBalances] = useState<Balances>({ Grogu: null, Mando: null, Matic: null });
    const getBalance = useBalance();
    const textColor = useColorModeValue('light.primary', 'dark.tertiary');

    useEffect(() => {
        const getBalances = async () => {
            const updatedBalances = await Promise.all([
                getBalance('Matic'),
                getBalance('Grogu'),
                getBalance('Mando'),
            ]);

            setBalances({
                Matic: updatedBalances[0],
                Grogu: updatedBalances[1],
                Mando: updatedBalances[2],
            });
        };

        getBalances();

        const interval = setInterval(getBalances, 10000);

        return () => clearInterval(interval);
    }, [getBalance]);

    return (
        <Popover trigger="hover" matchWidth>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    <VStack>
                        {balances &&
                            Object.entries(balances).map(([key, value]) => (
                                <HStack>
                                    <Image
                                        src={TokenImages[key as Token] || ''}
                                        boxSize="icon.medium"
                                        objectFit="contain"
                                    />
                                    <Text color={textColor}>{value}</Text>
                                </HStack>
                            ))}
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
