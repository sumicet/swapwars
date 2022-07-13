import { HStack, Text, VStack } from '@chakra-ui/layout';
import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import { ReactNode, useEffect, useState } from 'react';
import { Image } from '@chakra-ui/image';
import { Token, useBalance } from '../../web3';
import grogu from '../../assets/images/grogu.png';
import mando from '../../assets/images/mando.png';
import jawa from '../../assets/images/jawa.png';
import matic from '../../assets/images/matic.png';

const TokenImages = {
    Matic: matic,
    Grogu: grogu,
    Mando: mando,
    Jawa: jawa,
};

type Balances =
    | {
          [key in Token]: string | null;
      };
/**
 * @param children The popover trigger
 */
export function BalancePopover({ children }: { children: ReactNode }) {
    const [balances, setBalances] = useState<Balances>({ Grogu: null, Mando: null, Matic: null });
    const getBalance = useBalance();

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
                                        src={TokenImages[key]}
                                        boxSize="icon.medium"
                                        objectFit="contain"
                                    />
                                    <Text>{value}</Text>
                                </HStack>
                            ))}
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
